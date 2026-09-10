"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SOLUTIONS } from "@/content/home";
import { HOME } from "@/config/images";

export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const selected = SOLUTIONS.cards[active];

  return (
    <div className="service-showcase">
      <div className="service-visual" aria-hidden="true">
        {HOME.solutions.map((src, i) => (
          <Image key={src} src={src} alt="" fill sizes="(max-width: 767px) 100vw, 48vw"
            className={`service-photo ${active === i ? "is-active" : ""}`} />
        ))}
        <span className="service-image-caption">한 병원을 위한 하나의 계획</span>
      </div>
      <div className="service-options">
        {SOLUTIONS.cards.map((card, i) => (
          <button key={card.href} type="button" aria-pressed={active === i}
            aria-controls="service-description" onClick={() => setActive(i)}
            className={`service-option ${active === i ? "is-active" : ""}`}>
            <span className="service-number">0{i + 1}</span>
            <span>
              <span className="service-name">{card.title}</span>
              <span className="service-summary">
                <span className="service-tag">{card.tag}</span>
                {card.blurb}
              </span>
            </span>
            <span className="service-plus" aria-hidden="true">{active === i ? "−" : "+"}</span>
          </button>
        ))}
        <div id="service-description" className="service-description" aria-live="polite">
          <p>{selected.items.join(" · ")}</p>
          <Link href={selected.href} className="editorial-link">{selected.tag} 자세히 보기 <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}
