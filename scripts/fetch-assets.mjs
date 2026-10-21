// Downloads the original public assets of pediatricsboardreview.com into public/images.
// Inventory comes from docs/reference-spec.md §3. Existing files are skipped.
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const UPLOADS = "https://www.pediatricsboardreview.com/wp-content/uploads/";
const TRUSTINDEX = "https://cdn.trustindex.io/assets/";
const OUT = path.resolve("public/images");

const uploads = [
  "pediatrics-board-review-logo.webp",
  ["meet-your-coach-ashish-goyal.webp", "Meet-Your-Coach-–-Dr.-Ashish-Goyal-827x1024.webp"],
  "Ashish-mobile-Banner.webp",
  "Guarantee-Badge.webp",
  "aap-no-brainer-1.webp",
  "aap-moca-bundle-1.webp",
  "Thinking-Doctor.webp",
  "Practice-Link-Logo.webp",
  "NBC-Logo.webp",
  "Family-Education-Logo.webp",
  "pbr-vector.webp",
  "confident-pediatrician-after-board-success-1024x454.webp",
  "moca-pbr-collaborative-prep-1024x454.webp",
  "dr-nicole-mathis-testimonial.webp",
  "testimonial-varsha-raghavan.webp",
  "dr-katherine-wu-pbr-success-testimonial.webp",
  "dr-jessie-maxwell-testimonial.webp",
  "Concise-Content-icon-1.webp",
  "Made-Simple-icon-1.webp",
  "Effectiveness-icon-1.webp",
  "Guarantee-icon-1.webp",
  "Learning-icon-1.webp",
  "Mastery-icon-1.webp",
  "female-pediatrician-pointing-and-guiding-1.webp",
  "ashish-goyal-pbr-founder.webp",
  "Pediatric-Board-Exam-Results-for-2024-thumbnail.webp",
  "pediatrics-board-review-failed.webp",
  "Are-AAP-Prep-Questions-Good-to-Study.webp",
  "How-Many-AAP-Prep-Questions-for-Board-Review-1.webp",
  "Use-Test-Taking-Strategy-to-Help-You-Pass.webp",
  "Pros-and-Cons-of-Pediatric-Board-Review-Course-1.webp",
  "Great-Mnemonics-Can-Make-Passing-Much-Easier.webp",
  "pbr.webp",
  "Footer-bg.png",
  "pbr-dermatology-gastroenterology-study-guides.webp",
  "Home-popup-Icon.webp",
  "Pediatrics-Board-Review-Logo-White-1-scaled-e1764928355422.webp",
  "face.png",
  "twt.png",
  "in.png",
  "free-chapter-1.webp",
  "free-chapter-2.webp",
  "pbr-logo.webp",
];

const trustindex = {
  "trustindex/google-logo.svg": "platform/Google/logo.svg",
  "trustindex/google-icon.svg": "platform/Google/icon.svg",
  "trustindex/star.svg": "platform/Google/star/f.svg",
  "trustindex/pattern-dottie.svg": "img/widget-pattern-dottie.svg",
  "trustindex/verified.svg": "icon/ti-verified.svg",
  "trustindex/ai-profile.svg": "img/ai-profile-image.svg",
};

const G = "https://lh3.googleusercontent.com/";
const avatars = {
  "bina-adigopula": "a/ACg8ocIx3EgKFPdS3T08Qcu6ljbJukQq9PBLaqu2FoheypDSYCpgdw=w80-h80-c-rp-mo-br100",
  "jackie-guinn": "a/ACg8ocJc3DBc_94jtNHoJVpSDWfbMUIjia_29KAqALiYsC0ygzy-xw=w80-h80-c-rp-mo-br100",
  "maria-liverpool": "a-/ALV-UjWe05Ewl1HViFnNcPMSe3S7N7EBJiST1AdWrJC6oyYezppuuzY1=w80-h80-c-rp-mo-ba12-br100",
  "juan-snijder": "a-/ALV-UjVWgT402wvFfFueEPZL5yH2HUOdllcrQmRgpAan4aYlTjsv2A=w80-h80-c-rp-mo-br100",
  "rosalind-lopez": "a/ACg8ocKqhJB1UTnmhM5myEF9wIKuuHkyqCdP4n72-0CVhBMI13EFpxuX=w80-h80-c-rp-mo-ba12-br100",
  "xithor22": "a/ACg8ocIECNcnebCNDCi1KpSi1S0VxKixGikRgrbkqrOW1vGYy6CT7g=w80-h80-c-rp-mo-br100",
  "kataretya-jenkins": "a-/ALV-UjXEk5NCVJyQ7ITbvvQH6m9ODQJkVE3_8i7z6hWuWYIdu1L5G-w=w80-h80-c-rp-mo-ba12-br100",
  "sabrina-haniff": "a/ACg8ocJz-ptN4zjeS3JIGtvE212Ji7bzv9dw378AuaLg2QTi4sdglQ=w80-h80-c-rp-mo-br100",
  "simone-higgins": "a/ACg8ocIOzNgEGRY6aXcHHrIA9PpeZdrN_LRJUfl4G33CrRWxe0qhGw=w80-h80-c-rp-mo-br100",
  "cari-rayborn": "a/ACg8ocLfkeBziGld8iFY92kjKsAAiwvQgNSYPH_IEHrheavHOHz3fQ=w80-h80-c-rp-mo-br100",
};

const jobs = [
  // An entry is a filename, or [localName, remoteName] when the remote name is not URL-friendly.
  ...uploads.map((f) => {
    const [local, remote] = Array.isArray(f) ? f : [f, f];
    return [local, UPLOADS + encodeURIComponent(remote)];
  }),
  ...Object.entries(trustindex).map(([f, p]) => [f, TRUSTINDEX + p]),
  ...Object.entries(avatars).map(([f, p]) => [`avatars/${f}.jpg`, G + p]),
  [
    "avatars/ashish-goyal.jpg",
    "https://secure.gravatar.com/avatar/824b111a0b2373f99ecfbdb1af6f121d275fd7402fa8c438314b26f3927389f7?s=96&d=mm&r=g",
  ],
];

let failed = 0;
for (const [file, url] of jobs) {
  const dest = path.join(OUT, file);
  try {
    await access(dest);
    continue;
  } catch {}
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${url}`);
    failed++;
    continue;
  }
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`ok ${file}`);
}
if (failed) process.exit(1);
