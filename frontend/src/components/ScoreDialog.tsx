import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ANIME_LINKS = [
  "https://c.tenor.com/u2f7GM10EKQAAAAC/tenor.gif",
  "https://media1.tenor.com/m/Cj0YvuE94eoAAAAd/onimai-anime-sleep.gif",
  "https://media1.tenor.com/m/dUkiteCccQQAAAAd/yuru-camp-kagamihara-nadeshiko.gif",
  "https://media1.tenor.com/m/8DZuAbB5Up0AAAAd/anime-frieren.gif",
  "https://media1.tenor.com/m/w8bVOlSAZkUAAAAC/spy-x-family-anya-spy-x-family.gif",
];

function ScoreDialog({ moduleInfo, handleNextRound, open, setOpen }) {
  return (
    <Dialog open={open}>
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>
            You <i>CRASHED OUT</i>. The finals for{" "}
            <span className="text-main">{moduleInfo.course}</span> are over!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <img
            src={ANIME_LINKS[Math.floor(Math.random() * ANIME_LINKS.length)]}
            className="my-4 w-64"
          />
          <span>
            The bell curve god has blessed you with{" "}
            {moduleInfo.grade === "A" ? "an" : "a"}:
          </span>
          <span className="text-8xl font-bold main-text">
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
