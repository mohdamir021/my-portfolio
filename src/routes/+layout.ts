import meta from '../content/meta.json';
import hero from '../content/hero.json';
import about from '../content/about.json';
import skills from '../content/skills.json';
import projects from '../content/projects.json';
import contact from '../content/contact.json';

export const prerender = true;

export const load = () => ({ meta, hero, about, skills, projects, contact });
