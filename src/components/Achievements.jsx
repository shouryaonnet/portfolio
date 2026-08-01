import { achievements } from "@/data/achievements";

export default function Achievements() {
  return (
    <section id="achievements" className="achievements-section">
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>
        Achievements
      </p>

      <div className="timeline">
        {achievements.map((item, i) => (
          <div
            key={item.title}
            className="timeline-item"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="timeline-dot">{item.icon}</div>
            <div>
              <p className="timeline-title">{item.title}</p>
              <p className="timeline-year">{item.year}</p>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}