function OpinionCard({ opinion }) {
  return (
    <div className="opinion-card">

      <span className="opinion-topic">
        {opinion.emoji} {opinion.topic}
      </span>

      <h3>{opinion.name}</h3>

      <p>
        "{opinion.opinion}"
      </p>

    </div>
  );
}

export default OpinionCard;