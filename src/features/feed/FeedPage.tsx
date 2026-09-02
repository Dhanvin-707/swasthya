import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { articles } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

export default function FeedPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = articles.find((a) => a.id === selectedId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Health Feed</h1>
        <p className="text-sm text-muted">Preventive-care guidance from the National Health Network.</p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <motion.li
            key={article.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                <Badge tone="info" className="w-fit">
                  {article.category}
                </Badge>
                <CardTitle className="text-base">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted">{article.summary}</p>
                <div className="mt-3 flex items-center gap-1 text-sm text-muted">
                  <Clock aria-hidden size={16} />
                  {article.readingTime}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" className="w-full" onClick={() => setSelectedId(article.id)}>
                  <BookOpen aria-hidden size={16} />
                  Read Full Article
                </Button>
              </CardFooter>
            </Card>
          </motion.li>
        ))}
      </ul>

      <Dialog open={selected !== undefined} onOpenChange={(open) => !open && setSelectedId(null)} title={selected?.title ?? ""}>
        {selected && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted">
              {selected.category} · {selected.readingTime}
            </p>
            <p className="text-sm leading-relaxed text-fg">{selected.content}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
}
