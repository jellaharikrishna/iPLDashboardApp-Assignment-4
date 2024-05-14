import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    result,
    umpires,
    venue,
  } = latestMatchDetails
  return (
    <div className="match-details-container">
      <div className="match-date-venue-card">
        <p className="team-heading">{competingTeam}</p>
        <p className="sub-heading">{date}</p>
        <p className="heading">{venue}</p>
        <p className="heading">{result}</p>
      </div>
      <img
        className="competing-team-logo"
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
      />
      <hr className="hr-line" />
      <div className="innings-card">
        <p className="sub-heading">First Innings</p>
        <p className="heading">{firstInnings}</p>
        <p className="sub-heading">Second Innings</p>
        <p className="heading">{secondInnings}</p>
        <p className="sub-heading">Man Of The Match</p>
        <p className="heading">{manOfTheMatch}</p>
        <p className="sub-heading">Umpires</p>
        <p className="heading">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
