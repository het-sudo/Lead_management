-- DropForeignKey
ALTER TABLE "dev_skills" DROP CONSTRAINT "dev_skills_dev_id_fkey";

-- DropForeignKey
ALTER TABLE "dev_skills" DROP CONSTRAINT "dev_skills_tech_id_fkey";

-- AddForeignKey
ALTER TABLE "dev_skills" ADD CONSTRAINT "dev_skills_dev_id_fkey" FOREIGN KEY ("dev_id") REFERENCES "developerTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dev_skills" ADD CONSTRAINT "dev_skills_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
