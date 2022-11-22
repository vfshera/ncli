import chalkAnimation from "chalk-animation";

export function createProject(name: string) {
  const anim = chalkAnimation.karaoke(`creating ${name}`);
  setTimeout(() => anim.stop(), 4500);
}
