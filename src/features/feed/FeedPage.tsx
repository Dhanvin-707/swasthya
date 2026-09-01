import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, X } from "lucide-react";
import { articles } from "../../data/articles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function FeedPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = articles.find((a) => a.id === selectedId);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Health Feed</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {article.category}
                </Badge>
                <CardTitle className="text-base">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {article.readingTime}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedId(article.id)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Full Article
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <Dialog open onOpenChange={() => setSelectedId(null)}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.category} • {selected.readingTime}
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed">{selected.content}</p>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedId(null)}>
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
