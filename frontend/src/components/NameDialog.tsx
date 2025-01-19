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
        <Button>Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Welcome to <span className="main-text">CRASH OUT!</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <p className="text-neutral-600">
            Balance your study hours wisely to excel in your modules. While
            studying more improves performance, overworking can lead to
            burnout—'<span className="main-text">CRASH OUT</span>.' <br />{" "}
            <br />
            Strive for top grades by managing effort and rest effectively!
          </p>
          <h3 className="text-lg font-semibold mt-3">Grading Table</h3>
          <ul className="text-neutral-600">
            <li>A+: 80 and above</li>
            <li>A: 75 to 79</li>
            <li>A-: 70 to 74</li>
            <li>B+: 65 to 69</li>
            <li>B: 60 to 64</li>
            <li>B-: 55 to 59</li>
            <li>C+: 50 to 54</li>
            <li>C: 45 to 49</li>
            <li>D+: 40 to 44</li>
            <li>F: CRASHOUT</li>
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
