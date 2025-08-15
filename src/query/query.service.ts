import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class QueryService {
  constructor(private dataSource: DataSource) {}

  async getTopCompanies() {
    return await this.dataSource.query(`
      SELECT c.id,
             c.name,
             COUNT(v.id) AS active_vacancies
      FROM companies c
      JOIN vacancies v ON v."companyId" = c.id
      WHERE v.status = 'active'
      GROUP BY c.id, c.name
      ORDER BY active_vacancies DESC
      LIMIT 10;
    `);
  }

  async getSpecializationsSalary() {
    return await this.dataSource.query(`
      SELECT s.id,
             s.name AS specialization,
             ROUND(AVG(v."salaryFrom"), 2) AS avg_min_salary,
             ROUND(AVG(v."salaryTo"), 2) AS avg_max_salary
      FROM specialization s
      JOIN vacancies v ON v."specializationId" = s.id
      WHERE v.status = 'active'
      GROUP BY s.id, s.name
      ORDER BY avg_max_salary DESC;
    `);
  }

  async getSeekersSkills() {
    return await this.dataSource.query(`
      SELECT s.id,
             CONCAT(s.first_name, ' ', s.last_name) AS seeker_name,
             COUNT(ss.skill_id) AS total_skills
      FROM seekers s
      LEFT JOIN seeker_skills ss ON ss.seeker_id = s.id
      GROUP BY s.id, seeker_name
      ORDER BY total_skills DESC;
    `);
  }

  async topSeekersBySkills() {
    return this.dataSource.query(`
      SELECT s.id,
             CONCAT(s.first_name, ' ', s.last_name) AS seeker_name,
             COUNT(ss.skill_id) AS total_skills
      FROM seekers s
      LEFT JOIN seeker_skills ss ON ss.seeker_id = s.id
      GROUP BY s.id, seeker_name
      ORDER BY total_skills DESC;
    `);
  }

  async topHRByManagedVacancies() {
    return this.dataSource.query(`
      SELECT h.id,
             CONCAT(h.first_name, ' ', h.last_name) AS hr_name,
             c.name AS company_name,
             COUNT(v.id) AS managed_vacancies
      FROM hr h
      JOIN companies c ON h."companyId" = c.id
      LEFT JOIN vacancies v ON v."hrId" = h.id AND v.status = 'active'
      WHERE h.is_active = TRUE
      GROUP BY h.id, hr_name, c.name
      ORDER BY managed_vacancies DESC;
    `);
  }

  async getSpecializationDemandSkills() {
    return await this.dataSource.query(`
    SELECT s.name AS specialization,
           sk.name AS skill,
           COUNT(vs.id) AS demand_count
    FROM specialization s
    JOIN vacancies v ON v."specializationId" = s.id
    JOIN vacancy_skills vs ON vs."vacancyId" = v.id
    JOIN skill sk ON sk.id = vs."skillId"
    GROUP BY s.name, sk.name
    ORDER BY demand_count DESC
    LIMIT 20;
  `);
  }
}
