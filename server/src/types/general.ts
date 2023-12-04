export type Atributo = {
    name: string;
    value: string;
};

export type Artefato = {
    id: string;
    name: string;
    rarity: string;
    description: string;
    att1: Atributo;
    att2: Atributo;
};


// Enumeração para os tipos de equipamento
enum TipoEquipamento {
    Helmet = "helmet",
    Weapon = "weapon",
    Gloves = "gloves",
    Cloathing = "cloathing",
    PositiveRune = "positive rune",
    NegativeRune = "negative rune",
  }
  
  enum AtributoPrincipal {
    Helmet = "HP",
    Weapon = "Attack",
    Gloves = "Attack, ATK%, Crit Rate, Crit Damage",
    Cloathing = "Attack, ATK%, HP, HP%, Defense, DEF%, Accuracy, Resistence, Enlightenment",
  }
  
  type EfeitoEquipamento = {
    quantidade: "2 pieces" | "3 pieces";
    descricao: string;
  };
  
  export type Equipamento = {
    nome: string;
    type: TipoEquipamento;
    atributos: {
      atributo1: string;
      atributo2: string;
      atributo3: string;
      atributo4: string;
    };
    efeitos: EfeitoEquipamento[];
    atributoPrincipal: AtributoPrincipal;
  };