import { ArrowDown, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { splitFeatures, type Profile, type StyleId } from '../data/studio';

type EditableProps = {
  id: string;
  value: string;
  enabled: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  onChange: (value: string) => void;
};

function Editable({ id, value, enabled, as: Tag = 'p', className, onChange }: EditableProps) {
  return (
    <Tag
      className={className}
      data-edit-id={id}
      contentEditable={enabled}
      suppressContentEditableWarning
      onBlur={(event) => onChange(event.currentTarget.innerText.trim())}
    >{value}</Tag>
  );
}

type Props = {
  profile: Profile;
  styleId: StyleId;
  editMode: boolean;
  onProfileChange: (profile: Profile) => void;
};

export function HomepagePreview({ profile, styleId, editMode, onProfileChange }: Props) {
  const update = (key: keyof Omit<Profile, 'project'>, value: string) => onProfileChange({ ...profile, [key]: value });
  const updateProject = (key: keyof Profile['project'], value: string) => onProfileChange({ ...profile, project: { ...profile.project, [key]: value } });
  const features = splitFeatures(profile.project.features);
  const initials = profile.name.replace(/\s/g, '').slice(0, 2) || 'ME';

  return (
    <article className={`homepage-preview theme-${styleId} ${editMode ? 'editing' : ''}`}>
      <nav className="home-nav" aria-label="预览页导航">
        <strong>{initials}<i>.</i></strong>
        <span>ABOUT / WORK / CONTACT</span>
      </nav>

      <section className="home-hero">
        <div className="hero-orbit" aria-hidden="true"><span>{initials}</span><i /><i /></div>
        <div className="hero-copy">
          <Editable id="hero-role" value={profile.role} enabled={editMode} as="p" className="hero-role" onChange={(value) => update('role', value)} />
          <Editable id="hero-name" value={profile.name} enabled={editMode} as="h1" onChange={(value) => update('name', value)} />
          <Editable id="hero-tagline" value={profile.tagline} enabled={editMode} as="h2" onChange={(value) => update('tagline', value)} />
          <div className="hero-actions">
            <a href="#project">看项目 <ArrowDown size={15} /></a>
            <a href={`mailto:${profile.email}`}>联系我 <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <p className="hero-index">PORTFOLIO<br />/ 2026</p>
      </section>

      <section className="home-about">
        <p className="section-label">01 / ABOUT</p>
        <Editable id="about-bio" value={profile.bio} enabled={editMode} as="p" className="about-copy" onChange={(value) => update('bio', value)} />
        <div className="about-meta">
          <span><MapPin size={14} /><Editable id="about-location" value={profile.location} enabled={editMode} as="span" onChange={(value) => update('location', value)} /></span>
          <span><Mail size={14} /><Editable id="about-email" value={profile.email} enabled={editMode} as="span" onChange={(value) => update('email', value)} /></span>
        </div>
      </section>

      <section className="home-project" id="project">
        <div className="project-heading">
          <p className="section-label">02 / SELECTED WORK</p>
          <Editable id="project-name" value={profile.project.name} enabled={editMode} as="h2" onChange={(value) => updateProject('name', value)} />
        </div>
        <div className="project-layout">
          <div className="project-poster" aria-hidden="true"><span>{profile.project.name.slice(0, 1) || 'P'}</span><i>CASE / 01</i></div>
          <div className="project-story">
            <div><small>PROBLEM</small><Editable id="project-problem" value={profile.project.problem} enabled={editMode} onChange={(value) => updateProject('problem', value)} /></div>
            <div><small>MY ROLE</small><Editable id="project-role" value={profile.project.role} enabled={editMode} onChange={(value) => updateProject('role', value)} /></div>
            <div><small>OUTPUT</small><Editable id="project-result" value={profile.project.result} enabled={editMode} onChange={(value) => updateProject('result', value)} /></div>
            <div className="feature-list">
              {features.map((feature, index) => <span key={`${feature}-${index}`}>{String(index + 1).padStart(2, '0')} {feature}</span>)}
            </div>
            <Editable id="project-stack" value={profile.project.stack} enabled={editMode} as="p" className="project-stack" onChange={(value) => updateProject('stack', value)} />
            {profile.project.link && <a className="project-link" href={profile.project.link} target="_blank" rel="noreferrer">打开项目 <ArrowUpRight size={15} /></a>}
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <Editable id="footer-cta" value="有具体问题，欢迎直接来聊。" enabled={editMode} as="h2" onChange={() => undefined} />
        <a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={18} /></a>
        <p>Made from real information. No invented metrics.</p>
      </footer>
    </article>
  );
}
