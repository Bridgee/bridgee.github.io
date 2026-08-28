# Website Maintenance Context

Last consolidated: August 2026

This document is the working source of truth for maintaining Zhouqiao (Bridge) Zhao's personal website and coordinating it with the live HAITS Lab website at [haits.lmu.build](https://haits.lmu.build). Public-facing changes should still be checked against the latest CV before deployment.

## Current identity

- **Name:** Zhouqiao (Bridge) Zhao
- **Current role:** Assistant Professor of Electrical and Computer Engineering at Loyola Marymount University (LMU), August 2026–present
- **Lab role:** Lead, HAITS Lab
- **Email:** bridge.zhao@lmu.edu
- **Location:** Los Angeles, California
- **Preferred wording:** “where I lead the HAITS Lab” or “Lead, HAITS Lab”

## Career timeline

### University of California, Riverside

- PhD in Electrical Engineering, 2018–2023
- Advisors: Matthew Barth and Guoyuan Wu
- Dissertation: *A Connected Automation-Enabled Cooperative Management Framework for Mixed Traffic*
- UCR work should be presented as the doctoral foundation of the current research program, especially connected and automated vehicles, cooperative automation, traffic operations, and system-level optimization.

### Earlier education

- MS in Electrical and Computer Engineering, The Ohio State University, 2015–2017
- BS in Electronic and Information Engineering, University of Electronic Science and Technology of China, 2012–2015

### Massachusetts Institute of Technology

- Postdoctoral Associate, September 2023–July 2026
- MIT AgeLab and MIT Center for Transportation and Logistics
- Supervisors: Pnina Gershon and Bryan Reimer
- MIT work expanded the agenda toward human factors, driver behavior, vehicle automation, multimodal data, intelligent interfaces, and human-centered AI.
- The website was originally built during this period. MIT affiliations remain valid in historical project and publication descriptions, but must not appear as the current position.

### Loyola Marymount University

- Assistant Professor of Electrical and Computer Engineering, August 2026–present
- Current institutional identity for page titles, biographies, contact information, navigation, metadata, and the current CV
- LMU is the home of the HAITS Lab and the forward-looking research agenda.

## HAITS Lab identity

- **Full name:** Human-Centered Artificial Intelligence for Intelligent Transportation Systems Lab
- **Short name:** HAITS Lab
- **Pronunciation:** “heights”
- **Tagline:** “From human behavior to intelligent transportation systems.”
- **Lab website:** [https://haits.lmu.build](https://haits.lmu.build)
- The lab connects individual human behavior and interaction to intelligent agents, fleets, transportation networks, and system-level operations.
- Transportation is the primary domain and proving ground, not an artificial boundary on the methods or broader impact of the research.

## Research agenda

The central research chain is:

> human behavior, reactions, and interactions → trajectories → mobility choices → intelligent agents and fleets → transportation networks → system-level operations

The agenda is organized around three mutually reinforcing layers:

1. **Human behavior and interaction:** understand, model, and anticipate how people perceive, decide, adapt, and interact with automation and with one another.
2. **Human-centered intelligent agents and fleets:** design adaptive, explainable, and cooperative AI systems that learn from behavior and operate safely with people in the loop.
3. **Transportation networks and system operations:** connect individual and agent-level decisions to scalable coordination, optimization, digital twins, and network-level outcomes.

Core methods include AI and machine learning, robotics, control, optimization, human factors, simulation and digital twins, graph neural networks and explainable AI, reinforcement and inverse reinforcement learning, and multimodal or foundation models.

Primary outcomes are safety, environmental sustainability, mobility, trustworthy human–AI collaboration, and more effective transportation operations.

## Research program architecture

The research agenda and the lab infrastructure are related but should not be described as interchangeable lists.

- **Intellectual core:** human-centered AI and multimodal data intelligence for behavior modeling, prediction, planning, coordination, trustworthy automation, and system design.
- **Experimental environments:** human-in-the-loop simulation and digital twins; portable multimodal sensing and real-world data collection; scalable embodied AI and autonomous robotics testbeds.
- **Applications:** intelligent vehicles and human–automation interaction; multi-agent mobility and fleets; transportation networks and system-level operations.

The experimental environments support the research core. They are not separate equipment-driven research identities.

## Source priority

When public sources disagree, use this order:

1. The current user-approved CV and explicit decisions recorded in the LMU Research Plan and Agenda project.
2. The current LMU faculty profile and LMU-managed ExpertFile profile.
3. The current LinkedIn profile after a user-confirmed update.
4. Official publisher pages and DOI records for publications.
5. Historical institutional profiles for the period in which they were written.
6. ResearchGate, ORCID, OpenReview, indexing services, and other third-party profiles, which may lag behind a career transition.

See `docs/CONTENT_SOURCE_AUDIT.md` for the latest cross-source review and outstanding profile updates.

## Content and maintenance rules

- Keep current identity fields in `src/data/content/personal.js`; avoid duplicating email, role, CV path, or institutional links in unrelated files.
- Keep the lab identity and research framework in `src/data/content/research.js` and reuse them across Portfolio and Interactive modes.
- Keep mode labels, paths, icons, and descriptions in `src/data/config/modes.js`.
- Preserve MIT and UCR affiliations when they provide historical context for completed projects, education, or publications.
- Use `/doc/Zhouqiao_Zhao_CV.pdf` as the stable public URL for the current CV. Replace the file in place when the CV changes.
- Keep the two website modes aligned: Portfolio Mode is the formal academic presentation; Interactive Mode is a creative presentation of the same factual identity and research program.
- Verify new publications against their official publisher or DOI page before adding them.
- Run `npm run validate:external` after a production build whenever external links change.
- Do not deploy merely because a local build succeeds. Review wording and links, then deploy intentionally from the source branch.

## Personal and lab website boundary

The live lab site at [haits.lmu.build](https://haits.lmu.build) owns lab-specific people, news, opportunities, facilities, projects, platforms, publications, and recruitment content. The personal site retains a concise HAITS overview and links to the lab site, while personal photography, music, biographical detail, and the 8-bit world remain exclusive to the personal site unless there is a deliberate reason to share them. Shared identity, research layers, and tagline should remain consistent across both sites.
