import { Icon, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const VISIBILITY_THRESHOLD_SHOW = 2;
const VISIBILITY_THRESHOLD_HIDE = 1.5;

const variants: Variants = {
  visible: { opacity: 1, rotate: 0, bottom: 16 },
  invisible: { rotate: -360, bottom: -56 },
};

const MotionButton = motion(IconButton);

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      const ratio = window.scrollY / window.innerHeight;
      if (!visible && ratio > VISIBILITY_THRESHOLD_SHOW) setVisible(true);
      else if (visible && window.scrollY / window.innerHeight < VISIBILITY_THRESHOLD_HIDE) setVisible(false);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  });

  return (
    <AnimatePresence>
      {visible && (
        <MotionButton
          key={ScrollTopButton.name}
          variant="round"
          colorScheme="green"
          aria-label="Scroll to top"
          icon={<Icon as={FaAngleUp} />}
          position="fixed"
          boxShadow="dark-lg"
          right={4}
          transition={{ type: "ease", duration: 0.25 }}
          variants={variants}
          initial={variants.invisible}
          animate={variants.visible}
          exit={variants.invisible}
          onClick={() => window.scrollTo(0, 0)}
        />
      )}
    </AnimatePresence>
  );
}
