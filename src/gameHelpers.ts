export type Villager = {
    name: string;
    image_url: string;
  };

export function randVillagers(res: Villager[], clicked:string[]) {
    const villagers: Villager[] = [];
    let validCards = false; //to make sure there is a valid card to click
    if (res.length) {
      while(!validCards) {
        const randIds = randomIds(res.length, 6);
        randIds.map((id: number) => {
          const villName = res[id].name;
          if(!clicked.includes(villName))validCards=true;
          const parsedVillager = {
            name: villName,
            image_url: res[id].image_url,
          };
          villagers.push(parsedVillager);
        })
      }
    }
    return villagers;
}
function randomIds(numVillagers: number, numCards:number) {
    const ids: number[] = [];
    let i = 0;
    while (i < numCards) {
      const index = Math.floor(Math.random() * numVillagers);
      if (!ids.includes(index)) {
        ids.push(index);
        i++;
      }
    }
    return ids;
  }
