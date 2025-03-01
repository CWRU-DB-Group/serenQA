import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <Card className="container bg-card bg-cwrublue py-3 px-4 border-0 flex items-center rounded-none justify-between gap-6 min-w-full sticky top-0 z-500">
      <div className="text-white">SerenQA</div>

        <div className="flex items-center">
        <ul className="hidden md:flex items-center gap-6 text-card-foreground">
          <li className="text-primary font-medium">
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link href="/leaderboard" className="text-white hover:text-gray-300">Leaderboard</Link>
          </li>
          <li>
            <Link href="/questionnaire" className="text-white hover:text-gray-300">Questionnaire</Link>
          </li>
        </ul>

        <div className="flex md:hidden mr-2 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 rotate-0 scale-100"/>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/leaderboard">Leaderboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/questionnaire">Questionnaire</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default Navbar;