import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getName } from "@/lib/api";
import { useEffect, useState } from "react";

function NameDialog({ setOpen, open, setName, name }) {
  const [localName, setLocalName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!name && !open) {
          setError("Name cannot be empty");
          return;
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>Choose Name</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Full Name (as per your student ID)</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Input
            value={localName}
            onChange={(e) => {
              setLocalName(e.target.value);
              setError("");
            }}
            id="name"
            className="col-span-3"
          />
          <span className="text-red-500 mt-2">{error}</span>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              // Check if nme has been used
              if (!localName) {
                setError("Name cannot be empty");
                return;
              }
              const name = await getName(localName);
              if (name) {
                setError("Someone else stole your name :c");
                return;
              }

              setOpen(false);
              setName(localName);
            }}
          >
            Let's goooo!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NameDialog;
