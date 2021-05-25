# NFT-like Community-Driven Political Strategy Card Game (official title to be determined)
_____ will be a community driven strategy card game with very simple rules. The idea is to completely open source every part of the card creation process by allowing our users to create their own cards within a set of rules (for balance and playability), even submitting their own artwork or commissioned artwork as metadata. We will store metadata in our own proprietary DB, but the tokens will exist on chain using Nytro protocol.


## How we will use the Nytro token protocol
We will utilize a new issuance for each card token. Yes, we know this is expensive. However:
- The basis of the application is a strategy game that can be played even without cards (though not as exciting). The cards are an 'experience enhancement', and players will be allowed to play in brackets based on their investment in unique tokens.
- Having one or more cards allows you to enter a bracket based on the number of cards in your deck, up to 5 maximum cards (at the time of writing's conversion rates a 5 card deck would cost a little less than $300).
- The Community-Driven aspect: each player gets to design his or her cards. This includes everything from composable effects that will alter how the game will play out, to aesthetic features like the card background image. _The end users will foot the bill for token issuance_. This will make entry expensive, but really not much more expensive than other standard "hardcore" gaming investments. We believe that this model will work despite the expense thanks to the unique yet tradeable items granted to our users.
- Marketplace: we intend to also design a small marketplace for trading cards to one another. Trading fees will be able to match the standard nyzo fees (thanks!) 
- proprietary currency: Time allowing, we may additionally add an elastic supply currency mintable in exchange for nyzo to buy tickets to in game events.

### Additional Implementation Details
We will generate a token name obeying the token rules based on an internal algorithm prior to issuance. Each issuance will have a total supply of just one single token. Although the issuance at the time of writing is just shy of $60 we believe that players will be willing to invest in hopes that their personal card designs will accrue value based on both the effects composed and the artwork associated. I also assume token issuance cost may decrease as Nyzo value increases.

### Concerns
**Token namespace pollution** - Originally a concern, however we no longer think this will be a factor - we will generate unappealing token names, namespaced by issuer and a unique integer ID. We will generate a lot of tokens, but they will have algorithmically generated names that are unlikely to be desirable to another issuer.

**Lack of associated NFT-like data** - The card metadata will all be stored centrally by our proprietary servers. This lessens the DeFi factor somewhat, as we won't be able to know what components and images are present on a card without running it through our database first. No real workaround for this yet.

## Gameplay
'Weighted Rock Paper Scissors' is the term that we came up with to describe the gameplay. Each turn you choose one of three statistics, each essentially a variation on Rock Paper or Scissors. Then you play RPS with your opponent. You use values weighted by the statistic that governs the RPS variant chosen. The advantageous position holds a 1.5x weight multiplier, such that a player rolling rock with a governance stat of 3 will tie paper with a governance stat of 2. The winner of a turn's RPS bout may either increment a statistic of their own or decrement a statistic of their opponent. After 5 turns, the totals of each statistic are tallied and compared to your opponent to determine the victor. Cards, much like the Nytro token protocol, build on the core of the game by changing the rules slightly to solidify a strategy.

### Proposed RPS variants and stat names
Military > Economy > Society is the RPS cycle. Military beats Economy but loses to Society, Economy beats Society but loses to Military, and Society beats Military but loses to Economy. 

### Game End Paths
- **Win by statistic victory threshold**: achieving a certain statistic threshold grants you the victory, at this time that threshold is presumably 7.
- **Win by statistic disqualification**: Your opponent is disqualified if any of his or her stats falls below 1.
- **Win by final count**: the typical game-end case. Tally and compare your points, pairing each against its weaker. Player with the most victories wins, but this may also result in a draw.

### Example Turn

```
T# | P1 Stats       |   P2 Stats        |   Choice      |   Result  |   Effects
T1 | 2Mi 3So 2Ec    |   2Mi 2So 2Ec     |  3So x 2Ec    |   Draw    |   p1 card +1 starting Society pts
T2 | 2Mi 4So 2Ec    |   2Mi 2So 3Ec     |  4So x 3Ec    |   Draw    |   
T3 | 2Mi 5So 2Ec    |   2Mi 2So 4Ec     |  5So x 4Ec    |   P1Ec-1  |
//Two things could happen here - player 1 could have an ace up his sleeve, so imagine T4a as one T4 scenario
T4a| 2Mi 6So 1Ec    |   2Mi 2So 5Ec     |  P1So x P2Ec  |   P1Ec-1  |   p1 card +1 to stat immediately, chooses Ec raising 
                                                                        Ec over 0 and wins by Societal victory
//But P2 hasn't even played a card yet, and if P1 doesn't have another, P2 will win
T4b| 2Mi 6So 1Ec    |   2Mi 2So 5Ec     |  P1So x P2Ec  |   P1Ec-1  |   p1 has no cards left, loses by economic disqualification.

```
