import uniqueId from "lodash/fp/uniqueId";
import sample from "lodash/fp/sample";
import { normalizeTree } from "./functions";

const names = [
  "Aleta Akridge",
  "Christy Wheaton",
  "Ching Whittle",
  "Galen Lechner",
  "Hettie Shimkus",
  "Tai Gauna",
  "Fredric Dubinsky",
  "Reda Bialek",
  "Esta Roller",
  "Cordie Lisenby",
  "Cinda Pope",
  "Andera Ullery",
  "Lorenza Duet",
  "Dorinda Wygant",
  "Freddie Chao",
  "Rosalina Mooney",
  "Carmelo Younger",
  "Marilyn Arend",
  "Corinna Orenstein",
  "Sigrid Plumb",
  "Lauryn Briley",
  "Fredericka Stanbery",
  "Alisia Moy",
  "Classie Scuderi",
  "Tonya Faris",
  "Jacquiline Tarnowski",
  "Kylee Tapp",
  "Thuy Elliston",
  "Usha Hassett",
  "Sherly Mullen",
  "Randy Jessup",
  "Tommy Loy",
  "Bill Kramer",
  "Steve Johnson",
  "Lauren Welch",
  "Connie Muldowski",
  "Susan Aran",
  "Kuldeep Prashant"
];
export default {
  nodes: normalizeTree({
    id: `${uniqueId()}`,
    name: sample(names),
    children: [
      {
        id: `${uniqueId()}`,
        name: sample(names),
        children: [
          {
            id: `${uniqueId()}`,
            name: sample(names),
            children: [
              {
                id: `${uniqueId()}`,
                name: sample(names)
              },
              {
                id: `${uniqueId()}`,
                name: sample(names)
              }
            ]
          },
          {
            id: `${uniqueId()}`,
            name: sample(names),
            children: [
              {
                id: `${uniqueId()}`,
                name: sample(names),
                children: [
                  {
                    id: `${uniqueId()}`,
                    name: sample(names),
                    children: [
                      {
                        id: `${uniqueId()}`,
                        name: sample(names)
                      },
                      {
                        id: `${uniqueId()}`,
                        name: sample(names),
                        children: [
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          },
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          },
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          },
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          }
                        ]
                      },
                      {
                        id: `${uniqueId()}`,
                        name: sample(names)
                      },
                      {
                        id: `${uniqueId()}`,
                        name: sample(names),
                        children: [
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          },
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          },
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          },
                          {
                            id: `${uniqueId()}`,
                            name: sample(names)
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: `${uniqueId()}`,
                    name: sample(names)
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: `${uniqueId()}`,
        name: sample(names),
        children: [
          {
            id: `${uniqueId()}`,
            name: sample(names),
            children: [
              {
                id: `${uniqueId()}`,
                name: sample(names)
              },
              {
                id: `${uniqueId()}`,
                name: sample(names)
              }
            ]
          }
        ]
      },
      {
        id: `${uniqueId()}`,
        name: sample(names),
        children: []
      },
      {
        id: `${uniqueId()}`,
        name: sample(names),
        children: []
      }
    ]
  })
};
