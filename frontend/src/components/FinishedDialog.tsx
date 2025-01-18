import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import advocado from "@/assets/1.png";

function ScoreDialog({ finalGrade, open, setOpen, handleSubmitScore }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]" close={false}>
        <DialogHeader>
          <DialogTitle>You survived a semester! 🥳</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center">
            <img src={advocado} />
            <span>NUS has blessed you with a GPA of:</span>
            <span className="text-6xl font-bold main-text">{finalGrade}</span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              handleSubmitScore();
              setOpen(false);
            }}
          >
            Submit Score
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ScoreDialog;
