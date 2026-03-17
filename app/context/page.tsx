import Link from "next/link";
import PageShell from "../components/PageShell";
import TopicLink from "../components/TopicLink";

export const metadata = {
  title: "War Background & Context — Iran-UAE Conflict Explainer",
  description:
    "Understand the roots of the Iran-UAE conflict: history, US involvement, nuclear tensions, proxy wars, and the events that led to the 2026 crisis.",
};

function SectionHeading({
  emoji,
  title,
}: {
  emoji: string;
  title: string;
}) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mt-12 mb-4">
      {emoji} {title}
    </h2>
  );
}

function ContentCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
      {children}
    </div>
  );
}

export default function ContextPage() {
  return (
    <PageShell>
      <div className="py-8 lg:py-12 max-w-2xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          🌍 War Background & Context
        </h1>
        <p className="text-[var(--muted)] text-sm sm:text-base max-w-2xl leading-relaxed mb-4">
          How decades of tension, proxy wars, and nuclear disputes culminated in
          the 2026 Iran-UAE conflict.
        </p>

        <div className="space-y-6">
          {/* 1. Roots of Tension */}
          <SectionHeading emoji="🏛️" title="Roots of Tension" />
          <ContentCard>
            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              <p>
                Iran and the UAE have a complicated relationship stretching back decades.
                The most persistent flashpoint has been the dispute over three islands
                in the Persian Gulf — Abu Musa, Greater Tunb, and Lesser Tunb — which
                Iran seized from Sharjah in 1971, just before the UAE&apos;s formation.
                The UAE has never accepted Iran&apos;s sovereignty over these islands.
              </p>
              <p>
                Despite this territorial dispute, the UAE maintained pragmatic economic
                ties with Iran for years. Dubai served as a major re-export hub for
                Iranian goods, and a large Iranian expatriate community lived in the UAE.
                However, relations deteriorated sharply after the 2011 Arab Spring and
                the UAE&apos;s growing alignment with Saudi Arabia&apos;s more confrontational
                stance toward Iran.
              </p>
              <p>
                The UAE&apos;s decision to normalize relations with Israel in 2020 (the
                Abraham Accords) further strained ties with Tehran, which viewed the
                deal as a regional security threat.
              </p>
            </div>
          </ContentCard>

          {/* 2. The US Factor */}
          <SectionHeading emoji="🇺🇸" title="The US Factor" />
          <ContentCard>
            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              <p>
                The United States maintains its largest military presence in the Gulf
                region at <TopicLink slug="al-dhafra">Al Dhafra Air Base</TopicLink> near
                Abu Dhabi. The base hosts approximately 5,000 US personnel and serves
                as a critical hub for <TopicLink slug="centcom">CENTCOM</TopicLink> operations
                across the Middle East and Central Asia.
              </p>
              <p>
                Al Dhafra houses advanced fighter aircraft, surveillance drones, and
                aerial refueling tankers. It has been used for operations in Afghanistan,
                Iraq, Syria, and for surveillance of Iranian military activities. Iran
                has repeatedly warned that Gulf states hosting US military installations
                would be considered legitimate targets in any conflict.
              </p>
              <p>
                The UAE also hosts US Navy vessels at <TopicLink slug="jebel-ali">Jebel Ali</TopicLink> port
                — the largest port in the Middle East and a critical logistics hub for
                the US Fifth Fleet. The proximity of military assets to major civilian
                population centers has been a growing concern.
              </p>
              <p>
                Following the outbreak of hostilities, the US deployed additional{" "}
                <TopicLink slug="thaad">THAAD</TopicLink> and{" "}
                <TopicLink slug="patriot">Patriot</TopicLink> batteries to the UAE,
                and CENTCOM declared an elevated force protection posture across the
                region.
              </p>
            </div>
          </ContentCard>

          {/* 3. Nuclear Dimension */}
          <SectionHeading emoji="☢️" title="The Nuclear Dimension" />
          <ContentCard>
            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              <p>
                Iran&apos;s nuclear program has been a central source of tension for over
                two decades. The 2015 Joint Comprehensive Plan of Action (JCPOA)
                temporarily eased concerns by limiting Iran&apos;s enrichment activities
                in exchange for sanctions relief.
              </p>
              <p>
                The US withdrawal from the JCPOA in 2018 under President Trump, followed
                by the reimposition of &ldquo;maximum pressure&rdquo; sanctions, pushed Iran to
                gradually exceed the deal&apos;s enrichment limits. By 2024, Iran was
                enriching uranium to 60% purity — just a technical step from weapons-grade.
              </p>
              <p>
                Diplomatic efforts to revive the deal continued through 2025 but collapsed
                in January 2026 after Iran rejected new conditions proposed by the US and
                European partners. The IAEA reported a significant acceleration in Iran&apos;s
                nuclear activities in early 2026, raising fears that Tehran was approaching
                a nuclear breakout capability.
              </p>
              <p>
                This nuclear brinkmanship created a volatile backdrop. The Gulf states,
                particularly the UAE and Saudi Arabia, felt increasingly vulnerable and
                accelerated their own defense cooperation with the US.
              </p>
            </div>
          </ContentCard>

          {/* 4. Regional Proxy Wars */}
          <SectionHeading emoji="🔥" title="Regional Proxy Wars" />
          <ContentCard>
            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              <p>
                Iran&apos;s network of regional allies and proxy forces — often called the
                &ldquo;Axis of Resistance&rdquo; — has long been a source of tension with Gulf
                Arab states. This network includes Hezbollah in Lebanon, Shia militias
                in Iraq, and the Houthi movement in Yemen.
              </p>
              <p>
                The Yemen conflict has been particularly relevant. Since 2015, the UAE
                participated in the Saudi-led coalition fighting Houthi rebels, who
                receive Iranian weapons and support. In January 2022, the Houthis
                launched drone and missile attacks on Abu Dhabi, killing three people
                — a stark demonstration that the UAE was within range of Iranian-aligned
                forces.
              </p>
              <p>
                While the UAE scaled back its direct military role in Yemen after 2019,
                it continued to support local forces. Iran viewed this as ongoing
                aggression against its allies. The <TopicLink slug="shahed-drones">Shahed drone</TopicLink> technology
                that Iran provided to the Houthis — and later used extensively in Ukraine
                — proved devastatingly effective and cheap.
              </p>
              <p>
                In the current conflict, Houthi forces have launched concurrent attacks
                on Saudi Arabian targets, opening a second front and stretching regional
                <TopicLink slug="air-defense"> air defense</TopicLink> capabilities.
              </p>
            </div>
          </ContentCard>

          {/* 5. The Trigger */}
          <SectionHeading emoji="💥" title="The Trigger: January–February 2026" />
          <ContentCard>
            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              <p>
                The collapse of nuclear talks in January 2026 set off a rapid{" "}
                <TopicLink slug="escalation">escalation</TopicLink>. The US imposed new sanctions targeting
                Iran&apos;s oil exports and financial sector. Iran responded by announcing
                it would enrich uranium to 90% purity and expelled IAEA inspectors
                from key facilities.
              </p>
              <p>
                In early February, the US repositioned naval assets in the Persian Gulf,
                including an additional carrier strike group. Iran declared this a
                &ldquo;direct threat&rdquo; and put its military on high alert. The{" "}
                <TopicLink slug="strait-of-hormuz">Strait of Hormuz</TopicLink> saw several
                tense naval encounters.
              </p>
              <p>
                On February 25, an explosion at an IRGC facility in Isfahan — widely
                attributed to sabotage — killed several senior military officers. Iran
                blamed Israel and the US, vowing retaliation against &ldquo;all nodes of
                aggression,&rdquo; explicitly naming UAE bases hosting US forces.
              </p>
              <p>
                On February 28, Iran launched its first wave of{" "}
                <TopicLink slug="ballistic-missiles">ballistic missiles</TopicLink> at{" "}
                <TopicLink slug="al-dhafra">Al Dhafra Air Base</TopicLink> and surrounding areas.
                Multiple civilian casualties were reported. The UAE declared a national
                state of emergency, and <TopicLink slug="ncema">NCEMA</TopicLink> activated
                full crisis protocols.
              </p>
            </div>
          </ContentCard>

          {/* 6. Key Players */}
          <SectionHeading emoji="👥" title="Key Players" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ContentCard>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">
                Iran
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• <strong>IRGC</strong> — Islamic Revolutionary Guard Corps (military operations)</li>
                <li>• <strong>Supreme Leader</strong> — Ultimate authority on military decisions</li>
                <li>• <strong>IRGC Aerospace Force</strong> — Missile and drone operations</li>
              </ul>
            </ContentCard>
            <ContentCard>
              <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-2">
                UAE & Allies
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• <strong>UAE Armed Forces</strong> — National defense</li>
                <li>• <strong><TopicLink slug="ncema">NCEMA</TopicLink></strong> — Emergency management</li>
                <li>• <strong><TopicLink slug="centcom">US CENTCOM</TopicLink></strong> — Coalition defense coordination</li>
              </ul>
            </ContentCard>
            <ContentCard>
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
                International
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• <strong>UN Security Council</strong> — Emergency sessions called</li>
                <li>• <strong>IAEA</strong> — Nuclear monitoring (inspectors expelled)</li>
                <li>• <strong>GCC</strong> — Gulf Cooperation Council coordination</li>
              </ul>
            </ContentCard>
            <ContentCard>
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">
                Regional
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• <strong>Houthis (Yemen)</strong> — Iranian-aligned, attacking Saudi</li>
                <li>• <strong>Oman</strong> — Neutral mediator, open borders for evacuation</li>
                <li>• <strong>Saudi Arabia</strong> — Coalition partner, Houthi target</li>
              </ul>
            </ContentCard>
          </div>

          {/* 7. Full Timeline */}
          <SectionHeading emoji="📅" title="Full Timeline" />
          <div className="space-y-3">
            {[
              { date: "Jan 2026", event: "JCPOA revival talks collapse. US imposes new sanctions.", severity: "yellow" },
              { date: "Early Feb", event: "Iran announces 90% uranium enrichment. IAEA inspectors expelled.", severity: "yellow" },
              { date: "Feb 15", event: "US repositions carrier strike group to Persian Gulf.", severity: "yellow" },
              { date: "Feb 25", event: "Explosion at IRGC facility in Isfahan. Iran blames Israel/US.", severity: "red" },
              { date: "Feb 28", event: "Iran launches first missile barrage at Al Dhafra Air Base. Civilian casualties. UAE declares state of emergency.", severity: "red" },
              { date: "Feb 28", event: "NCEMA activates crisis protocols. Schools closed. Airspace shut.", severity: "red" },
              { date: "Mar 1", event: "Shahed drone wave targets UAE oil infrastructure. Fujairah terminal damaged.", severity: "red" },
              { date: "Mar 1", event: "Strait of Hormuz closed to commercial shipping. Oil prices surge.", severity: "red" },
              { date: "Mar 2", event: "US deploys additional THAAD and Patriot batteries. CENTCOM elevates posture.", severity: "yellow" },
              { date: "Mar 3", event: "Second ballistic missile wave targets Abu Dhabi and Dubai. Impacts near Jebel Ali.", severity: "red" },
              { date: "Mar 3", event: "Houthis launch concurrent attacks on Saudi Arabia.", severity: "red" },
              { date: "Mar 4", event: "UN Security Council emergency session. No ceasefire agreement.", severity: "yellow" },
              { date: "Mar 5-6", event: "UAE intercepts 6/7 missiles, 125/131 drones. Oil surges 35% for biggest weekly gain since 1983.", severity: "red" },
              { date: "Mar 7", event: "Iran strikes Al Dhafra Air Base. French base Camp de la Paix hit by drones.", severity: "red" },
              { date: "Mar 8", event: "Three shelter alerts in Abu Dhabi. Israel strikes Tehran oil depots. New supreme leader chosen.", severity: "red" },
              { date: "Mar 9", event: "Mojtaba Khamenei named supreme leader. Oil hits $119.50. Qatar struck. 11,000+ flights canceled.", severity: "red" },
              { date: "Mar 10", event: "US declares 'most intense day of strikes.' Iran fires lowest missiles since war. US destroys 16 minelayers.", severity: "red" },
              { date: "Mar 11", event: "Three ships hit near Hormuz. IEA releases strategic oil reserves. Iran attacks targets across Israel and Gulf.", severity: "red" },
              { date: "Mar 12", event: "Six US airmen killed in KC-135 crash in Iraq. Mojtaba Khamenei's first address — vows Hormuz closure.", severity: "red" },
              { date: "Mar 13", event: "US bombs Kharg Island oil terminal. Trump: 'totally obliterated.' US lifts Russian oil restrictions.", severity: "red" },
              { date: "Mar 14", event: "UAE intercepts 9 missiles, 33 drones. 1,000+ tankers stranded at Hormuz. Trump urges allies to send warships.", severity: "red" },
              { date: "Mar 15", event: "Iran FM: 'We never asked for a ceasefire.' IDF hits 200+ targets in Iran. Israel ground ops in Lebanon.", severity: "red" },
              { date: "Mar 16", event: "Drone hits fuel tank near Dubai airport. Missile kills resident in Abu Dhabi. NATO/Japan refuse Hormuz patrol.", severity: "red" },
              { date: "Mar 17", event: "UAE briefly closes airspace — reopens. Israel kills Iran security chief Ali Larijani. 2,300+ total killed.", severity: "red" },
            ].map((item, i) => (
              <ContentCard key={i}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mt-2 ${
                        item.severity === "red" ? "bg-red-500" : "bg-yellow-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted)] mb-1">
                      {item.date}
                    </p>
                    <p className="text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </ContentCard>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-[var(--card-border)] flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 hover:border-[var(--muted)] transition-all text-center"
            >
              <p className="text-xs text-[var(--muted)]">← Back to</p>
              <p className="text-sm font-semibold">Home & Practical Guide</p>
            </Link>
            <Link
              href="/topics"
              className="flex-1 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 hover:border-[var(--muted)] transition-all text-center"
            >
              <p className="text-xs text-[var(--muted)]">Explore →</p>
              <p className="text-sm font-semibold">Topics & Glossary</p>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--card-border)] text-center text-xs text-[var(--muted)] space-y-2">
          <p>
            This page is for informational purposes only. Always follow official
            UAE government guidance.
          </p>
        </footer>
      </div>
    </PageShell>
  );
}
