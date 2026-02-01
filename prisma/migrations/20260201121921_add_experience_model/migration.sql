/*
  Warnings:

  - The `description` column on the `Experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];

-- CreateTable
CREATE TABLE "SkillsOnExperiences" (
    "experienceId" VARCHAR(191) NOT NULL,
    "skillId" VARCHAR(191) NOT NULL,

    CONSTRAINT "SkillsOnExperiences_pkey" PRIMARY KEY ("experienceId","skillId")
);

-- AddForeignKey
ALTER TABLE "SkillsOnExperiences" ADD CONSTRAINT "SkillsOnExperiences_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnExperiences" ADD CONSTRAINT "SkillsOnExperiences_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
