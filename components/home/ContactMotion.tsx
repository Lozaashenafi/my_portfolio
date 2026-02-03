"use client";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const itemRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export const ContactMotionWrapper = ({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "left" | "right";
}) => (
  <motion.div
    variants={side === "left" ? container : itemRight}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={side === "left" ? "space-y-12" : ""}
  >
    {children}
  </motion.div>
);

export const ContactItemMotion = ({
  children,
}: {
  children: React.ReactNode;
}) => <motion.div variants={itemLeft}>{children}</motion.div>;
