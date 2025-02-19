"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    if (!scope.current) return; // Ensure scope is mounted
    animate("span", { opacity: 1, filter: filter ? "blur(0px)" : "none" }, {
      duration: duration || 1,
      delay: stagger(0.2),
    });
  }, [words]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-2 mx-auto max-w-md">
        <motion.div ref={scope} className="text-center text-2xl leading-normal tracking-wide dark:text-white text-black">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: duration, delay: idx * 0.2 }}
              className="dark:text-white text-white"
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
