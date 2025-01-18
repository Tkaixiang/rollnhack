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

function ScoreDialog({ moduleInfo, handleNextRound, open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            You <i>survived</i>?{" "}
            <span className="text-main">{moduleInfo.course}</span>!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <span>
            The bell curve god has blessed you with{" "}
            {moduleInfo.grade === "A" ? "an" : "a"}:
          </span>
          <span className="text-6xl font-bold main-text">
            {moduleInfo.grade}
          </span>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setOpen(false);
              handleNextRound();
            }}
          >
            Let's goooo!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ScoreDialog;
