import { m, type HTMLMotionProps } from 'motion/react';
import { ease, inView } from './motion';

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Fait apparaître son contenu en fondu quand il arrive à l'écran. */
export default function Reveal({ delay = 0, y = 20, children, ...rest }: Props) {
  return (
    <m.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 1, ease, delay }} {...rest}>
      {children}
    </m.div>
  );
}
