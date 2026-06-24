import { profile } from './profile';

function App() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-[#f8f4ec]">
      <div className="mx-auto w-[min(1120px,calc(100%-40px))] py-9">
        <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/60" aria-label="主导航">
          <strong className="text-white">{profile.name}</strong>
          <div className="flex gap-4">
            <a href="#projects">项目</a>
            <a href="#contact">联系</a>
          </div>
        </nav>

        <section className="grid min-h-[76vh] items-center gap-12 py-16 md:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6a3d]">{profile.title}</p>
            <h1 className="mt-5 max-w-4xl text-balance text-[clamp(42px,7vw,92px)] font-black leading-[0.98] tracking-[-0.06em]">
              {profile.tagline}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-9 text-white/68">{profile.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#ff6a3d] px-5 py-3 font-bold text-black" href="#projects">查看项目</a>
              <a className="rounded-full border border-white/15 px-5 py-3 font-bold" href="#contact">联系我</a>
            </div>
          </div>
          <div className="grid min-h-[420px] place-items-center rounded-[32px] border border-white/10 bg-white/[0.07] p-8 text-center text-white/55">
            图片 / 项目视觉占位
          </div>
        </section>

        <section id="projects" className="border-t border-white/10 py-14">
          <h2 className="text-balance text-4xl font-black">精选项目</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {profile.projects.map((project) => (
              <article key={project.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <h3 className="text-xl font-black">{project.title}</h3>
                <p className="mt-4 leading-8 text-white/62">{project.problem}</p>
                <p className="mt-4 text-sm text-white/45">角色：{project.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-14">
          <h2 className="text-balance text-4xl font-black">联系</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {profile.links.map((link) => <a key={link.label} className="rounded-full border border-white/15 px-4 py-2" href={link.href}>{link.label}</a>)}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
