//Marcos e Guilherme
//itens
const items = [
    { name: 'Saco de Dormir', weight: 15, points: 15 },
    { name: 'Corda', weight: 3, points: 7 },
    { name: 'Canivete', weight: 2, points: 10 },
    { name: 'Tocha', weight: 5, points: 5 },
    { name: 'Garrafa', weight: 9, points: 8 },
    { name: 'Comida', weight: 20, points: 17 },
];
//padroes iniciais
let population = [
    [1, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 1],
];

function calc(pop) {
    let weight = 0;
    let points = 0;

    for (p in pop) {
        if (pop[p] == 1) {
            weight += items[p].weight;
            points += items[p].points;
        }
    }
    return { weight: weight, points: points };
}

function compute() {
    const perfectHeight = 30;
    const perfectPoints = 30;

    let result = [];

    for (p of population) {
        result.push(calc(p));
    }

    for (r of result) {
        if (r.weight == perfectHeight && r.points == perfectPoints && r.weight < perfectHeight && r.points < perfectPoints) {
            return result;
        }
    }

    return null;
}

function mutation() {
    const mutationTax = 0.50;
    for (individual of population) {
        let index = population.indexOf(individual);
        for (let i = 0; i < individual.length; i++) {
            let prob = Math.random();
            if (prob <= mutationTax) {
                let gen1 = i;
                let gen2 = getRandom(0, individual.length);
                while (gen1 == gen2) {
                    gen2 = getRandom(0, (individual.length - 1));
                }
                population[index][gen1] = population[index][gen2];
                population[index][gen2] = population[index][gen1];
            }
        }
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    result = 0;

    do {
        result = (Math.floor(Math.random() * (max - min + 1)) + min);
    } while (result >= max);

    return result;
}

function select() {
    let remove = [];

    for (p1 in population) {
        for (p2 in population) {
            let calc1 = calc(population[p1]);

            if (calc1.points > 30 || calc1.weight > 30) {
                remove.push(p1);
            }
        }
    }

    const r = remove.sort((a, b) => remove.filter(v => v === a).length - remove.filter(v => v === b).length).pop();

    if (r) {
        population = population.filter((v, i) => i != r);
    }
}

function main() {
    while (compute() == null) {
        select();
        mutation();
        console.log(population);
    }

    console.log(compute());

}

main();