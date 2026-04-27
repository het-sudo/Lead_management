import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Developer } from "@/types/developer";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer: Developer | null;
};

export function ViewDeveloperDialog({ open, onOpenChange, developer }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Developer Details</DialogTitle>
        </DialogHeader>

        {developer && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Technologies</p>

              <div className="flex flex-wrap gap-2">
                {developer.tech_skills?.length ? (
                  developer.tech_skills.map((item) => (
                    <span
                      key={item.technology.id}
                      className="px-2 py-1 text-xs bg-gray-200 rounded"
                    >
                      {item.technology.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No technologies</p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
