-- CreateTable
CREATE TABLE "developerTeam" (
    "id" TEXT NOT NULL,
    "developer_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developerTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dev_skills" (
    "id" TEXT NOT NULL,
    "dev_id" TEXT NOT NULL,
    "tech_id" TEXT NOT NULL,

    CONSTRAINT "dev_skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "developerTeam_developer_name_key" ON "developerTeam"("developer_name");

-- AddForeignKey
ALTER TABLE "dev_skills" ADD CONSTRAINT "dev_skills_dev_id_fkey" FOREIGN KEY ("dev_id") REFERENCES "developerTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dev_skills" ADD CONSTRAINT "dev_skills_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
