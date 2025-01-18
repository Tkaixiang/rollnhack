import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ScoreDialog({ moduleInfo, handleNextRound, open, setOpen }) {
  return (
    <Dialog open={open}>
      <DialogTrigger />
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>
            You <i>CRASHED OUT</i>. The finals for{" "}
            <span className="text-main">{moduleInfo.course}</span> are over!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <img
            src="https://c.tenor.com/u2f7GM10EKQAAAAC/tenor.gif"
            className="my-4"
          />
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
