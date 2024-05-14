import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    matchStatus,
    result,
  } = matchCardDetails

  const matchStatusClassname =
    matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="matchcard-list">
      <img
        className="matchcard-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="matchcard-title">{competingTeam}</p>
      <p className="matchcard-heading">{result}</p>
      <p className={matchStatusClassname}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
