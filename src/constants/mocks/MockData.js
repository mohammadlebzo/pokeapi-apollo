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
    species: [
      {
        id: 16,
        name: "pidgey",
      },
    ],
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
    species: [
      {
        id: 16,
        name: "pidgey",
      },
    ],
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

const NO_DATA_MOCK_RESULT = {
  data: {
    pokemon: [],
    pokeNum: {aggregate: {count: 0}},
    species: [],
  },
};

const SPECISES_FILTER_DATA_RESULT = {
  data: {
    species: [
      {
        pokemons: [
          {
            id: 16,
            name: "pidgey",
            weight: 18,
            height: 3,
            base_experience: 50,
            pokemon_v2_pokemonabilities: [
              {
                pokemon_v2_ability: {
                  name: "keen-eye",
                },
              },
              {
                pokemon_v2_ability: {
                  name: "tangled-feet",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

const SPECIES_DATA_STATE = {
  data: {
    species: [
      {
        id: 16,
        name: "pidgey",
      },
    ],
  },
}

export {
  OPTIONS_MOCK_DATA,
  DEFULT_TRACK_MOCK_RESULT,
  SEARCH_MOCK_RESULT,
  DETAILS_MOCK_RESULT,
  NO_DATA_MOCK_RESULT,
  SPECISES_FILTER_DATA_RESULT,
  SPECIES_DATA_STATE
};
