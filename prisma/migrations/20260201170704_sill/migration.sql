-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('FRONTEND', 'BACKEND', 'TOOLS');

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "category" "SkillCategory" NOT NULL DEFAULT 'FRONTEND';
