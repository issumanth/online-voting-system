import candidate1 from "../images/candidate1.png";
import candidate2 from "../images/candidate2.jpg";
import candidate3 from "../images/candidate3.png";

/* ================= CENTRAL ================= */

const central = [
  {
    id: 1,
    name: "Rahul Sharma",
    position: "Prime Minister Candidate",
    party: "BJP",
    image: candidate1,
  },
  {
    id: 2,
    name: "Amit Verma",
    position: "Prime Minister Candidate",
    party: "INC",
    image: candidate2,
  },
  {
    id: 3,
    name: "Sneha Iyer",
    position: "Prime Minister Candidate",
    party: "AAP",
    image: candidate3,
  }
];

/* ================= STATE ================= */

const state = [
  {
    id: 4,
    name: "Ramesh Naidu",
    position: "Chief Minister Candidate",
    party: "TDP",
    image: candidate1,
  },
  {
    id: 5,
    name: "Kiran Reddy",
    position: "Chief Minister Candidate",
    party: "YSRCP",
    image: candidate2,
  },
  {
    id: 6,
    name: "Anjali Devi",
    position: "Chief Minister Candidate",
    party: "BRS",
    image: candidate3,
  }
];

/* ================= PANCHAYAT ================= */

const panchayat = [
  {
    id: 7,
    name: "Suresh Kumar",
    position: "Village Head",
    party: "Independent",
    image: candidate1,
  },
  {
    id: 8,
    name: "Lakshmi Bai",
    position: "Village Head",
    party: "Local Party A",
    image: candidate2,
  },
  {
    id: 9,
    name: "Ravi Teja",
    position: "Village Head",
    party: "Local Party B",
    image: candidate3,
  }
];

/* ================= EXPORT ================= */

export const parties = {
  central,
  state,
  panchayat
};