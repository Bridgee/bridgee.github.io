# Content Source Audit

Reviewed: August 26, 2026

This audit records how the website's career, research, lab, publication, and external-profile content was reconciled during the transition from MIT to Loyola Marymount University. It separates website facts from third-party profiles that have not yet been updated.

## Approved website baseline

- **Name:** Zhouqiao (Bridge) Zhao
- **Current position:** Assistant Professor of Electrical and Computer Engineering at Loyola Marymount University, August 2026–present
- **Lab role:** Lead, HAITS Lab
- **Lab:** Human-Centered Artificial Intelligence for Intelligent Transportation Systems Lab
- **Current email:** bridge.zhao@lmu.edu
- **Current location:** Los Angeles, California
- **MIT appointment:** Postdoctoral Associate, MIT AgeLab and MIT Center for Transportation and Logistics, September 2023–July 2026
- **Doctorate:** PhD in Electrical Engineering, University of California, Riverside, 2018–2023
- **Earlier degrees:** MS in Electrical and Computer Engineering, The Ohio State University, 2015–2017; BS in Electronic and Information Engineering, University of Electronic Science and Technology of China, 2012–2015
- **Research identity:** human-centered AI connecting human behavior, reactions, decisions, and interactions to trajectories, mobility choices, intelligent agents and fleets, transportation networks, and system-level operations
- **Methods:** AI and machine learning, robotics, control, optimization, human factors, simulation and digital twins, explainable and graph-based learning, reinforcement and inverse reinforcement learning, and multimodal or foundation models
- **Outcomes:** safety, environmental sustainability, mobility, trustworthy human–AI collaboration, and effective transportation operations

## Source reconciliation

| Source | Observed status | Website decision |
| --- | --- | --- |
| [Current website CV](../public/doc/Zhouqiao_Zhao_CV.pdf) | Updated August 26, 2026; contains LMU, the canonical HAITS expansion, corrected appointment dates, education, research interests, publications, funded projects, service, mentoring, talks, and awards | Primary factual reference for dates, degrees, titles, and the public CV download |
| [LMU ECE faculty profile](https://cse.lmu.edu/department/electricalandcomputerengineeringdepartment/faculty/?expert=bridge.zhao) | Current LMU faculty location; embeds the LMU-managed ExpertFile record | Primary institutional link shown by both website modes |
| [LMU college faculty profile](https://cse.lmu.edu/faculty/?expert=bridge.zhao) | Current college-level faculty location; embeds the same ExpertFile record | Retained as an official alternate institutional URL |
| [ExpertFile](https://expertfile.com/experts/bridge.zhao/bridge-zhao) | Current LMU title, HAITS biography, Los Angeles location, research agenda, education, expertise, and patents | Used as the current official public biography reference |
| [LinkedIn](https://www.linkedin.com/in/zhouqiao-zhao-60560a56/) | The August 24 project capture shows LMU, `Lead, HAITS Lab`, Los Angeles, and an updated About section aligned with the research agenda | Terminology aligned around `Lead, HAITS Lab`; the site does not scrape or duplicate volatile LinkedIn activity |
| [Google Scholar](https://scholar.google.com/citations?hl=en&user=Y1s8cw0AAAAJ&view_op=list_works&sortby=pubdate) | Publications are current, but the profile still shows MIT and a verified `mit.edu` address | Used only as a publication index link; its affiliation is not treated as current website data |
| [MIT AgeLab](https://agelab.mit.edu/about-us/people/zhouqiao-bridge-zhao) | Still describes the MIT postdoctoral appointment as current | Linked only as a historical MIT profile from the historical career paragraph |
| [MIT CTL](https://ctl.mit.edu/people/zhouqiao-zhao) | Still describes the MIT postdoctoral appointment as current | Linked only as a historical MIT profile from the historical career paragraph |
| [ResearchGate](https://www.researchgate.net/profile/Zhouqiao-Zhao) | Still lists MIT as the current institution and Postdoctoral Associate as the current position | Retained as a scholarly profile link, but never used as the source for current role text |
| [ORCID](https://orcid.org/0000-0002-5286-3807) | Still lists the MIT appointment as present and contains stale education end dates | Recorded for maintenance but not displayed in the main profile-link set until updated |
| [OpenReview](https://openreview.net/profile?id=~Zhouqiao_Zhao1) | Still contains the MIT postdoctoral period and MIT email identity | Not displayed on the website |
| AD Scientific Index and similar aggregators | Still associate the profile with MIT and reproduce older bibliometric data | Not displayed or used as a factual source |

## Known cross-source discrepancies

1. The user-confirmed official expansion of HAITS is `Human-Centered Artificial Intelligence for Intelligent Transportation Systems`. The downloadable CV and website use this canonical name. The ExpertFile biography and captured LinkedIn text omit the word `Intelligent` before `Transportation Systems`; those external profiles should be aligned when they are next edited.
2. The CV and LinkedIn use `PhD in Electrical Engineering`; ExpertFile and the MIT profiles use `Electrical and Computer Engineering`. The website follows the current CV.
3. The CV and website use `Lead, HAITS Lab` or `where I lead the HAITS Lab`. This matches the current LinkedIn headline and ExpertFile biography. `Director` should not replace it unless the user adopts that formal title across profiles.
4. Google Scholar, MIT AgeLab, MIT CTL, ResearchGate, ORCID, OpenReview, and automated indexes lag behind the August 2026 LMU transition.
5. Google Scholar includes records beyond the website's curated publication list. The website intentionally presents selected publications and links to Scholar for the complete and evolving index.

## External profile updates still owned outside this repository

Recommended priority:

1. Update Google Scholar affiliation to Loyola Marymount University and verify an `lmu.edu` email.
2. Update ResearchGate's current institution, position, biography, and research interests.
3. Update ORCID employment and education end dates and add the LMU appointment.
4. Correct the HAITS expansion in ExpertFile and LinkedIn so each includes `Intelligent Transportation Systems`; the downloadable CV is already aligned.
5. Align ExpertFile's PhD field with the chosen CV wording if `Electrical Engineering` is the intended official degree name.
6. Ask MIT AgeLab and MIT CTL to mark the profiles as former or archival if their content-management policy allows it.
7. Update OpenReview and any researcher indexes that allow owner edits; automated aggregators may update only after Scholar and institutional sources change.

## Link review policy

- External links rendered by the site open in a new tab with `noopener` protection.
- Current institutional links point to the LMU faculty record rather than a generic department homepage.
- MIT personal profiles are used only in historical context.
- Unreliable fragment identifiers were removed from the UCR Toyota Digital Twin links; both now point to the stable project page.
- The ClustrMaps visitor-tracking page and widgets were removed because the provider could not be verified and the previous `No personal data collected` claim was not supportable.
- Run a fresh production build and `npm run validate:external` after changing external URLs.

## August 26, 2026 link audit result

- 48 unique external URLs were rendered by the final production build.
- 45 returned a successful automated response.
- 0 returned a broken response.
- The SAGE DOI destination, LinkedIn, and ResearchGate restricted automated requests. The publication record was corroborated through Google Scholar and bibliographic search; the LinkedIn URL was corroborated by the signed-in August 24 project capture; and the ResearchGate URL was corroborated through its public indexed page.
