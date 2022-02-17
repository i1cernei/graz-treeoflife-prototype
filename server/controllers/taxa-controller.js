const { default: axios } = require("axios");


exports.taxaAll = async (req, res) => {
  // let taxaRes;
  // try {
  //   taxaRes = await fetch('https://api.gbif.org/v1/species?rank=kingdom&limit=9')
  //   res.json({ taxa: taxaRes });
  // } catch (error) {
  //   res.json({message: `There was an error retrieving taxa lis.: ${error}`})
  // }

  axios.get('https://api.gbif.org/v1/species?rank=kingdom&limit=9').then(
    response => {
      res.json({ taxa: response.data, parentRank: "KINGDOM" });
    }
  ).catch(error => {
    res.json({message: `There was an error retrieving taxa list: ${error}`})
  })
}

exports.goDeep = async (req, res) => {
  // let taxaRes;
  // try {
  //   taxaRes = await fetch('https://api.gbif.org/v1/species?rank=kingdom&limit=9')
  //   res.json({ taxa: taxaRes });
  // } catch (error) {
  //   res.json({message: `There was an error retrieving taxa lis.: ${error}`})
  // }
  let targetRank = "PHYLUM";
  let nextRank = "CLASS";
  let nextNextRank = "ORDER";
  let deepRank = "FAMILY";
  let deeperRank = "TRIBE";
  let deepestRank = "GENUS";

  switch (req.body.rank) {
    case "KINGDOM":
      targetRank = "PHYLUM"
      break;
    case "PHYLUM":
      targetRank = "CLASS"
      nextRank = "ORDER"
      nextNextRank = "FAMILY"
      deepRank = "TRIBE";
      break;
    case "CLASS":
      targetRank = "ORDER"
      nextRank = "FAMILY"
      nextNextRank = "TRIBE"
      deepRank = "GENUS";
      break;
    case "ORDER":
      targetRank = "FAMILY"
      nextRank = "TRIBE"
      nextNextRank = "GENUS"
      deepRank = "SPECIES";
      break;
    case "FAMILY":
      targetRank = "TRIBE"
      nextRank = "GENUS";
      nextNextRank = "SPECIES"
      deepRank = "SPECIES";
      break;
    case "TRIBE":
      targetRank = "GENUS"
      nextRank = "SPECIES"
      nextNextRank = "SPECIES"
      deepRank = "SPECIES";
      break;
    case "GENUS":
      targetRank = "SPECIES"
      break;

    case "SPECIES":
      targetRank = "SPECIES"
      return;
        // break;
    default:
      targetRank = "SPECIES"
  }

  const reqURL = `https://api.gbif.org/v1/species/${req.body.id}/children?limit=1000&rank=${targetRank}`
  console.log(reqURL);

  axios.get(reqURL).then(
    response => {

      const filteredTaxa = []

        response.data.results.forEach((item, index) => {
          if (item.rank == targetRank) {

            console.log(0, 'found rank children');
            filteredTaxa.push(item)
          }

          if (filteredTaxa.length === 0) {
            console.log(0, 'going next', nextRank);
            if (item.rank == nextRank) {
              filteredTaxa.push(item)
            }
          }

          if (filteredTaxa.length === 0) {
            console.log(0, 'going nextnext', nextNextRank);
            if (item.rank == nextNextRank) {
              filteredTaxa.push(item)
            }
          }

          if (filteredTaxa.length === 0) {
            console.log(0, 'going deep', deepRank);
            if (item.rank == deepRank) {
              filteredTaxa.push(item)
            }
          }
        })


      // console.log(filteredTaxa);

      // console.log(response.data.results[0], filteredTaxa[0])
      res.json({ taxa: filteredTaxa , targetRank: targetRank, parentRank: req.body.rank});
    }
  ).catch(error => {
    res.json({message: `There was an error retrieving taxa list: ${error}`})
  })
}

exports.goUp = async (req, res) => {
  // let taxaRes;
  // try {
  //   taxaRes = await fetch('https://api.gbif.org/v1/species?rank=kingdom&limit=9')
  //   res.json({ taxa: taxaRes });
  // } catch (error) {
  //   res.json({message: `There was an error retrieving taxa lis.: ${error}`})
  // }
  console.log(req.body)
  axios.get(`https://api.gbif.org/v1/species/${req.body.parentKey}/children?strict=true&limit=1000&rank=${req.body.parentRank}`).then(
    response => {
      const filteredTaxa = []

        response.data.results.forEach((item, index) => {
          if (item.rank == req.body.parentRank) {

            console.log(0, 'found rank children');
            filteredTaxa.push(item)
          }

          // if (filteredTaxa.length === 0) {
          //   console.log(0, 'going next', nextRank);
          //   if (item.rank == nextRank) {
          //     filteredTaxa.push(item)
          //   }
          // }

          // if (filteredTaxa.length === 0) {
          //   console.log(0, 'going nextnext', nextNextRank);
          //   if (item.rank == nextNextRank) {
          //     filteredTaxa.push(item)
          //   }
          // }

          // if (filteredTaxa.length === 0) {
          //   console.log(0, 'going deep', deepRank);
          //   if (item.rank == deepRank) {
          //     filteredTaxa.push(item)
          //   }
          // }
        })


      res.json({ taxa: response.data });
    }
  ).catch(error => {
    res.json({message: `There was an error retrieving taxa list: ${error}`})
  })
}
