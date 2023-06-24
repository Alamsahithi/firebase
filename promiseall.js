function buyCar() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Car");
    }, 1000);
  });
}

function goToManali() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Manali");
    }, 2000);
  });
}

function reachDestination(destination) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Reached ${destination}`);
    }, 1500);
  });
}

async function manaliTrip() {
  try {
    const car = await buyCar();
    console.log("Buy a", car);

    const destination = await goToManali();
    console.log("Let's go to", destination);

    const reachedManali = await reachDestination(destination);
    console.log(reachedManali);
  } catch (error) {
    console.error("Error:", error);
  }
}

manaliTrip();
