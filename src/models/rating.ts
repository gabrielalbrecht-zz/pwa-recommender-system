import { LearningMaterial } from "./learningMaterial";

export class Rating {

        constructor(
                public rating: Number = 0,
                public learningMaterial: LearningMaterial,
                public userId: String = "",
        ) {

        }
}