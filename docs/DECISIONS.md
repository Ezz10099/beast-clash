# Pixel Mage — Durable Decisions

This is an append-only record of decisions future sessions must not repeatedly reopen. Correct factual errors when found, but do not silently erase a decision's history.

## D-001 — Finish Pixel Mage First

- Date: July 11, 2026
- Status: Locked
- Decision: `Ezz10099/beast-clash` is the active repository, `main` is the working branch, and Pixel Mage is the only active game until Google Play testing or formal cancellation.
- Reason: The owner has many unfinished projects and needs one completed publishing cycle.
- Change rule: Requires an explicit cancellation decision, not temporary frustration or a new idea.

## D-002 — Original Small Release Scope

- Date: July 11, 2026
- Status: Superseded as the commercial launch scope on July 13, 2026; retained as the validated vertical-slice contract
- Original decision: Build one mage, five waves, slime variants, one boss, between-wave upgrades, score, replay, settings, and the existing release UX.
- Outcome: The scope was completed, packaged, installed, and accepted without reported bugs, but the owner completed the entire game in roughly one minute.
- Reason for supersession: It proved the development-to-APK pipeline but does not provide sufficient demonstrated depth for the profit-focused launch goal.
- Change rule: Do not discard the stable baseline. Expand only after a new capped commercial scope receives explicit owner approval.

## D-003 — Web-First Technical Route

- Date: July 11, 2026
- Status: Locked
- Decision: Keep the custom HTML/CSS/JavaScript runtime and do not switch engines before release.
- Reason: It is directly editable through GitHub, previews easily in SPCK, and already passes the release checks.
- Change rule: Reconsider only if a verified release blocker cannot be solved in the current stack.

## D-004 — One-Thumb Controls

- Date: July 11, 2026
- Status: Accepted on phone
- Decision: Drag inside the arena to move; spells cast automatically; pause and options remain in one compact overlay.
- Reason: This tested simpler and easier than a D-pad plus a fire button on the target phone.
- Change rule: Restore separate controls only if native APK testing proves the accepted model unusable.

## D-005 — Android Identity and Capacitor

- Date: July 12, 2026
- Status: Locked for release
- Decision: Use Capacitor 8 with package ID `com.ezz10099.pixelmage`, portrait orientation, API 24 minimum, and API 36 target.
- Reason: Capacitor converts the finished web project into a normal Android project without an engine rewrite.
- Change rule: The package ID must not change after the Play Console app is created. Any earlier change still requires explicit owner approval.

## D-006 — APK and AAB Roles

- Date: July 12, 2026
- Status: Clarified
- Decision: Debug APKs are milestone test builds. The final Google Play upload will be a securely signed release AAB.
- Reason: An APK is directly installable, while Google Play uses an AAB to generate optimized APKs for users.
- Change rule: Never treat a debug APK as a Play-ready release.

## D-007 — Decision Leadership

- Date: July 11, 2026
- Status: Active
- Decision: ChatGPT/Codex leads routine technical and workflow choices; the owner remains creative director and approves major or irreversible decisions.
- Reason: This reduces decision paralysis without surrendering product ownership.
- Change rule: Major decisions are listed in `docs/START_HERE.md` and always require explicit approval.

## D-008 — Repository as Permanent Memory

- Date: July 12, 2026
- Status: Locked
- Decision: GitHub documentation, not chat memory, is the permanent project record. Every meaningful session must close by updating the handoff and roadmap.
- Reason: Different sessions may have incomplete conversation context.
- Change rule: None; only the specific document structure may be improved.
## D-009 — Native Build Is a Vertical Slice

- Date: July 13, 2026
- Status: Locked
- Decision: The accepted one-minute APK is a validated native vertical slice, not the commercially complete Pixel Mage release.
- Reason: Technical stability and Google Play eligibility are different from sufficient player value, engagement, and replayability.
- Change rule: It may become the foundation of the launch game, but it must not be represented as the intended finished commercial product.

## D-010 — Evidence Before Commercial Scope Lock

- Date: July 13, 2026
- Status: Active planning rule
- Decision: Complete one final focused research round, compare feasible capped options, and phone-time a representative full run before locking content-count or playtime claims.
- Reason: Earlier estimates such as 15 or 60 stages and fixed campaign hours were not grounded in the current one-minute build or a tested content unit.
- Change rule: Research must end in a decision; it may not become an indefinite substitute for development. Exact gameplay scope still requires explicit owner approval.

