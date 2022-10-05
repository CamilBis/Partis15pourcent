import fetch from "node-fetch";

async function getQP() {
    const res = await fetch("https://www.dgeq.org/resultats.json");
    const resJson = await res.json();

    const mapper = {
        "C.A.Q.-E.F.L.": "CAQ",
        "P.L.Q./Q.L.P.": "PLQ",
        "Q.S.": "QS",
        "P.Q.": "PQ",
        "P.C.Q.-E.E.D.": "PCQ"
    };

    const qp = {
        "CAQ": 0,
        "PLQ": 0,
        "QS": 0,
        "PQ": 0,
        "PCQ": 0
    };

    for(let circo of resJson['circonscriptions']) {
        for(let candidature of circo['candidats']) {
            const parti = mapper[candidature['abreviationPartiPolitique']];
            if(parti && candidature['tauxVote'] > 15) {
                qp[parti]++;
            }
        }
    }

    return qp;
}

getQP().then(console.log).catch(console.log)