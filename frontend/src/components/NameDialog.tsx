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
        if (!localName && !open) {
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
          <DialogTitle>Welcome to CRASH OUT!</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <p className="text-neutral-600">
          Balance your study hours wisely to excel in your modules. While studying more improves performance, overworking can lead to burnout—'CRASH OUT.' Strive for top grades by managing effort and rest effectively!
          </p>
          <h3 className="text-lg font-semibold mt-3">Grading Table</h3>
          <ul className="text-neutral-600">
            <li>A: 70 and above</li>
            <li>A-: 60 to 69</li>
            <li>B+: 50 to 59</li>
            <li>B: 40 to 49</li>
            <li>C: 30 to 39</li>
            <li>F: Below 30</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-2">
            Name (as per your student ID)
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
              if (!localName) {
                setError("Name cannot be empty");
                return;
              }
              const nameExists = await getName(localName);
              if (nameExists) {
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
