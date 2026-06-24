import type { VisualKey } from '../data/templates';
import { ArtPreviews } from '../previews/art';
import { BusinessPreviews } from '../previews/business';
import { CreatorPreviews } from '../previews/creator';
import { TechPreviews } from '../previews/tech';

const previewComponents: Record<VisualKey, () => JSX.Element> = {
  ...TechPreviews,
  ...CreatorPreviews,
  ...BusinessPreviews,
  ...ArtPreviews,
};

export function PreviewCanvas({ visual }: { visual: VisualKey }) {
  const Preview = previewComponents[visual];
  return <Preview />;
}
