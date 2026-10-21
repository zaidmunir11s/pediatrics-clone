import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";

// Test fixture for e2e/primitives.spec.ts. Not linked from the site.
export default function Primitives() {
  return (
    <main className="flex flex-col items-start gap-6 p-10">
      <Button data-testid="btn-primary" href="#" chevron>
        Get Started
      </Button>
      <Button data-testid="btn-preorder" variant="preorder" href="#">
        Preorder for $1 ›
      </Button>
      <CheckList data-testid="checklist" items={["One", "Two"]} />
    </main>
  );
}
