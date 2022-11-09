const OPTIONS_MOCK_DATA = [
  "Name Descending",
  "Name Ascending",
  "Height Descending",
  "Height Ascending",
  "Base Experience Descending",
  "Base Experience Ascending",
];

const DEFULT_TRACK_MOCK_RESULT = {
  data: {
    pokemon: [
      {
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        base_experience: 64,
        abilities: [
          {
            pokemon_v2_ability: {
              id: 34,
              name: "chlorophyll",
            },
          },
          {
            pokemon_v2_ability: {
              id: 65,
              name: "overgrow",
            },
          },
        ],
      },
      {
        id: 2,
        name: "ivysaur",
        height: 10,
        weight: 130,
        base_experience: 142,
        abilities: [
          {
            pokemon_v2_ability: {
              id: 34,
              name: "chlorophyll",
            },
          },
          {
            pokemon_v2_ability: {
              id: 65,
              name: "overgrow",
            },
          },
        ],
      },
    ],
    pokeNum: {
      aggregate: {
        count: 1154,
      },
    },
  },
};

const SEARCH_MOCK_RESULT = {
  data: {
    pokemon: [
      {
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        base_experience: 64,
        abilities: [
          {
            pokemon_v2_ability: {
              id: 34,
              name: "chlorophyll",
            },
          },
          {
            pokemon_v2_ability: {
              id: 65,
              name: "overgrow",
            },
          },
        ],
      },
    ],
    pokeNum: {
      aggregate: {
        count: 1154,
      },
    },
  },
};

const DETAILS_MOCK_RESULT = {
  data: {
    pokemon: [
      {
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        base_experience: 64,
        abilities: [
          {
            pokemon_v2_ability: {
              id: 34,
              name: "chlorophyll",
            },
          },
          {
            pokemon_v2_ability: {
              id: 65,
              name: "overgrow",
            },
          },
        ],
      },
    ],
  },
};

export {
  OPTIONS_MOCK_DATA,
  DEFULT_TRACK_MOCK_RESULT,
  SEARCH_MOCK_RESULT,
  DETAILS_MOCK_RESULT,
};
