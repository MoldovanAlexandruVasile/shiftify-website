// A stylised November 2026 in the app's own status colours: worked, day off,
// bank holiday, missing. Purely decorative.
type Status = "worked" | "off" | "holiday" | "missing" | "weekend" | "future";

const YEAR = 2026;
const MONTH = 10; // November (0-based)
const TODAY = 26;
const DAYS_OFF = [9, 10];
const MISSING = [17];
const HOLIDAYS = [30]; // St Andrew's Day, a Romanian bank holiday

function statusOf(day: number): Status {
  const weekday = new Date(YEAR, MONTH, day).getDay();
  if (HOLIDAYS.includes(day)) return "holiday";
  if (weekday === 0 || weekday === 6) return "weekend";
  if (day > TODAY) return "future";
  if (DAYS_OFF.includes(day)) return "off";
  if (MISSING.includes(day)) return "missing";
  return "worked";
}

const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
const days = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, status: statusOf(i + 1) }));
const leadingBlanks = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // week starts Monday
const workedCount = days.filter((d) => d.status === "worked").length;

export function CalendarMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__bar">
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__dot" />
      </div>
      <div className="mock__body">
        <div className="mock__header">
          <div>
            <div className="mock__client">Acme SRL</div>
            <div className="mock__month">November 2026</div>
          </div>
          <div className="mock__stat">
            <strong>{workedCount}</strong>
            <span>days worked</span>
          </div>
        </div>
        <div className="mock__grid">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="mock__weekday">
              {d}
            </div>
          ))}
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <div key={`b${i}`} />
          ))}
          {days.map(({ day, status }) => (
            <div
              key={day}
              className={`mock__day mock__day--${status}${day === TODAY ? " mock__day--today" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="mock__legend">
          <Legend status="worked" label="Worked" />
          <Legend status="off" label="Day off" />
          <Legend status="holiday" label="Bank holiday" />
          <Legend status="missing" label="Missing" />
        </div>
      </div>
    </div>
  );
}

function Legend({ status, label }: { status: Status; label: string }) {
  return (
    <span className="mock__legend-item">
      <span className={`mock__swatch mock__day--${status}`} />
      {label}
    </span>
  );
}
