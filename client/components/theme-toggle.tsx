import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative border-cyber-blue/30 hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all"
        >
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4 text-cyber-orange" />
            ) : theme === "dark" ? (
              <Moon className="h-4 w-4 text-cyber-blue" />
            ) : (
              <Monitor className="h-4 w-4 text-cyber-purple" />
            )}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="glass border-white/10 bg-dark-surface/90 backdrop-blur-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-cyber-orange/20 cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4 text-cyber-orange" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-cyber-blue/20 cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4 text-cyber-blue" />
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
