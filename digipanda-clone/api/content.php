<?php
/**
 * Dynamic Content API for Qala Labs
 * Serves website content directly from MySQL (Hostinger PDO) with
 * JSON decoding for structured array fields and HTTP caching headers.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

function decode_json_field(?string $val) {
    if ($val === null || $val === '') return null;
    $decoded = json_decode($val, true);
    return json_last_error() === JSON_ERROR_NONE ? $decoded : $val;
}

function map_case_study(array $row): array {
    return [
        'id' => (int)$row['id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'subtitle' => $row['subtitle'] ?? '',
        'result' => $row['result'] ?? '',
        'thumb' => $row['thumb'] ?? '',
        'category' => $row['category'] ?? '',
        'challenge' => $row['challenge'] ?? '',
        'approach' => decode_json_field($row['approach']) ?? [],
        'results' => decode_json_field($row['results']) ?? [],
        'testimonial' => decode_json_field($row['testimonial']),
    ];
}

function map_portfolio_project(array $row): array {
    return [
        'id' => $row['project_id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'client' => $row['client'],
        'category' => $row['category'],
        'year' => $row['year'],
        'coverImage' => $row['cover_image'],
        'cover_image' => $row['cover_image'],
        'summary' => $row['summary'],
        'impactMetric' => $row['impact_metric'],
        'impact_metric' => $row['impact_metric'],
        'deliverables' => decode_json_field($row['deliverables']) ?? [],
        'technologies' => decode_json_field($row['technologies']) ?? [],
        'liveUrl' => $row['live_url'] ?? null,
        'caseStudySlug' => $row['case_study_slug'] ?? null,
        'featured' => (bool)$row['featured'],
    ];
}

function map_blog_post(array $row): array {
    return [
        'id' => (int)$row['id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'subtitle' => $row['subtitle'] ?? '',
        'excerpt' => $row['excerpt'] ?? '',
        'category' => $row['category'] ?? '',
        'readTime' => $row['read_time'] ?? '',
        'publishedAt' => $row['published_at'] ?? '',
        'coverImage' => $row['cover_image'] ?? '',
        'author' => $row['author'] ?? '',
        'tags' => decode_json_field($row['tags']) ?? [],
        'featured' => (bool)$row['featured'],
        'content' => $row['content'] ?? '',
    ];
}

function map_service(array $row): array {
    return [
        'id' => (int)$row['id'],
        'slug' => $row['slug'],
        'name' => $row['name'],
        'track' => $row['track'],
        'tagline' => $row['tagline'] ?? '',
        'description' => $row['description'] ?? '',
        'deliverables' => decode_json_field($row['deliverables']) ?? [],
        'agents' => decode_json_field($row['agents']) ?? [],
        'proof' => decode_json_field($row['proof']) ?? [],
    ];
}

function map_product(array $row): array {
    return [
        'id' => (int)$row['id'],
        'slug' => $row['slug'],
        'name' => $row['name'],
        'tagline' => $row['tagline'] ?? '',
        'category' => $row['category'] ?? '',
        'description' => $row['description'] ?? '',
        'features' => decode_json_field($row['features']) ?? [],
        'howItWorks' => decode_json_field($row['how_it_works']) ?? [],
    ];
}

function map_agent(array $row): array {
    return [
        'id' => (int)$row['id'],
        'slug' => $row['slug'],
        'name' => $row['name'],
        'tagline' => $row['tagline'] ?? '',
        'whatItDoes' => $row['what_it_does'] ?? '',
        'howBuilt' => decode_json_field($row['how_built']) ?? [],
        'integrations' => decode_json_field($row['integrations']) ?? [],
    ];
}

function map_job_opening(array $row): array {
    return [
        'id' => $row['job_id'],
        'title' => $row['title'],
        'department' => $row['department'],
        'location' => $row['location'],
        'type' => $row['type'],
        'experience' => $row['experience'],
        'compensation' => $row['compensation'],
        'tagline' => $row['tagline'],
        'description' => $row['description'],
        'responsibilities' => decode_json_field($row['responsibilities']) ?? [],
        'requirements' => decode_json_field($row['requirements']) ?? [],
        'techStack' => decode_json_field($row['tech_stack']) ?? [],
    ];
}

function map_creator_track(array $row): array {
    return [
        'id' => $row['track_id'],
        'title' => $row['title'],
        'badge' => $row['badge'],
        'description' => $row['description'],
        'deliverables' => decode_json_field($row['deliverables']) ?? [],
        'tools' => decode_json_field($row['tools']) ?? [],
        'idealFor' => $row['ideal_for'],
    ];
}

function map_agency_model(array $row): array {
    return [
        'id' => $row['model_id'],
        'title' => $row['title'],
        'badge' => $row['badge'],
        'headline' => $row['headline'],
        'description' => $row['description'],
        'features' => decode_json_field($row['features']) ?? [],
        'bestFor' => $row['best_for'],
    ];
}

try {
    $db = get_db();
} catch (\Throwable $e) {
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection unavailable',
        'message' => $e->getMessage(),
    ]);
    exit;
}

$type = isset($_GET['type']) ? trim((string)$_GET['type']) : 'all';
$slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : null;

// Set caching headers: 2 minutes browser cache, 10 minutes stale-while-revalidate
header('Cache-Control: public, max-age=120, stale-while-revalidate=600');

try {
    switch ($type) {
        case 'case-studies':
        case 'case_studies':
            $stmt = $db->query('SELECT id, slug, title, subtitle, result, thumb, category, challenge, approach, results, testimonial FROM case_studies ORDER BY id ASC LIMIT 100');
            $rows = $stmt->fetchAll();
            $data = array_map('map_case_study', $rows);
            break;

        case 'case-study':
            if (!$slug) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Slug parameter required']);
                exit;
            }
            $stmt = $db->prepare('SELECT id, slug, title, subtitle, result, thumb, category, challenge, approach, results, testimonial FROM case_studies WHERE slug = :slug LIMIT 1');
            $stmt->execute([':slug' => $slug]);
            $row = $stmt->fetch();
            if (!$row) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Case study not found']);
                exit;
            }
            $data = map_case_study($row);
            break;

        case 'portfolio':
        case 'portfolio_projects':
            $stmt = $db->query('SELECT id, project_id, slug, title, client, category, year, cover_image, summary, impact_metric, deliverables, technologies, live_url, case_study_slug, featured FROM portfolio_projects ORDER BY id ASC LIMIT 100');
            $rows = $stmt->fetchAll();
            $data = array_map('map_portfolio_project', $rows);
            break;

        case 'blogs':
        case 'blog_posts':
            $stmt = $db->query('SELECT id, slug, title, subtitle, excerpt, category, read_time, published_at, cover_image, author, tags, featured, content FROM blog_posts ORDER BY id ASC LIMIT 100');
            $rows = $stmt->fetchAll();
            $data = array_map('map_blog_post', $rows);
            break;

        case 'services':
            $stmt = $db->query('SELECT id, slug, name, track, tagline, description, deliverables, agents, proof FROM services ORDER BY id ASC LIMIT 100');
            $rows = $stmt->fetchAll();
            $data = array_map('map_service', $rows);
            break;

        case 'products':
            $stmt = $db->query('SELECT id, slug, name, tagline, category, description, features, how_it_works FROM products ORDER BY id ASC LIMIT 50');
            $rows = $stmt->fetchAll();
            $data = array_map('map_product', $rows);
            break;

        case 'agents':
        case 'ai_agents':
            $stmt = $db->query('SELECT id, slug, name, tagline, what_it_does, how_built, integrations FROM ai_agents ORDER BY id ASC LIMIT 50');
            $rows = $stmt->fetchAll();
            $data = array_map('map_agent', $rows);
            break;

        case 'careers':
        case 'jobs':
            $stmt = $db->query('SELECT id, job_id, title, department, location, type, experience, compensation, tagline, description, responsibilities, requirements, tech_stack FROM job_openings WHERE active = 1 ORDER BY id ASC LIMIT 50');
            $openRoles = array_map('map_job_opening', $stmt->fetchAll());

            $stmtPillars = $db->query('SELECT id, title, tagline, description, icon_name FROM culture_pillars ORDER BY display_order ASC LIMIT 50');
            $culturePillars = $stmtPillars->fetchAll();

            $stmtPerks = $db->query('SELECT id, title, description, category FROM company_perks ORDER BY display_order ASC LIMIT 50');
            $perksList = $stmtPerks->fetchAll();

            $data = [
                'openRoles' => $openRoles,
                'culturePillars' => $culturePillars,
                'perksList' => $perksList,
            ];
            break;

        case 'collectives':
            $stmtTracks = $db->query('SELECT id, track_id, title, badge, description, deliverables, tools, ideal_for FROM creator_tracks ORDER BY id ASC LIMIT 50');
            $creatorTracks = array_map('map_creator_track', $stmtTracks->fetchAll());

            $stmtModels = $db->query('SELECT id, model_id, title, badge, headline, description, features, best_for FROM agency_models ORDER BY id ASC LIMIT 50');
            $agencyModels = array_map('map_agency_model', $stmtModels->fetchAll());

            $data = [
                'creatorTracks' => $creatorTracks,
                'agencyModels' => $agencyModels,
            ];
            break;

        case 'faqs':
            $stmt = $db->query('SELECT question AS q, answer AS a, category AS cat FROM faqs WHERE active = 1 ORDER BY display_order ASC LIMIT 100');
            $data = $stmt->fetchAll();
            break;

        case 'testimonials':
            $stmt = $db->query('SELECT id, name, role, company, quote, metric, avatar_url, case_study_slug, featured FROM testimonials WHERE featured = 1 ORDER BY display_order ASC LIMIT 50');
            $data = $stmt->fetchAll();
            break;

        case 'offices':
            $stmt = $db->query('SELECT country, city, flag_url AS flag, timezone FROM global_offices ORDER BY display_order ASC LIMIT 50');
            $data = $stmt->fetchAll();
            break;

        case 'unified-work':
            $stmt = $db->query('SELECT * FROM unified_work_items ORDER BY created_at DESC LIMIT 100');
            $data = $stmt->fetchAll();
            break;

        case 'all':
        default:
            $csRows = $db->query('SELECT id, slug, title, subtitle, result, thumb, category, challenge, approach, results, testimonial FROM case_studies ORDER BY id ASC LIMIT 100')->fetchAll();
            $portRows = $db->query('SELECT id, project_id, slug, title, client, category, year, cover_image, summary, impact_metric, deliverables, technologies, live_url, case_study_slug, featured FROM portfolio_projects ORDER BY id ASC LIMIT 100')->fetchAll();
            $blogRows = $db->query('SELECT id, slug, title, subtitle, excerpt, category, read_time, published_at, cover_image, author, tags, featured, content FROM blog_posts ORDER BY id ASC LIMIT 100')->fetchAll();
            $srvRows = $db->query('SELECT id, slug, name, track, tagline, description, deliverables, agents, proof FROM services ORDER BY id ASC LIMIT 100')->fetchAll();
            $prodRows = $db->query('SELECT id, slug, name, tagline, category, description, features, how_it_works FROM products ORDER BY id ASC LIMIT 50')->fetchAll();
            $agRows = $db->query('SELECT id, slug, name, tagline, what_it_does, how_built, integrations FROM ai_agents ORDER BY id ASC LIMIT 50')->fetchAll();
            $jobRows = $db->query('SELECT id, job_id, title, department, location, type, experience, compensation, tagline, description, responsibilities, requirements, tech_stack FROM job_openings WHERE active = 1 ORDER BY id ASC LIMIT 50')->fetchAll();
            $pillarRows = $db->query('SELECT id, title, tagline, description, icon_name FROM culture_pillars ORDER BY display_order ASC LIMIT 50')->fetchAll();
            $perkRows = $db->query('SELECT id, title, description, category FROM company_perks ORDER BY display_order ASC LIMIT 50')->fetchAll();
            $trackRows = $db->query('SELECT id, track_id, title, badge, description, deliverables, tools, ideal_for FROM creator_tracks ORDER BY id ASC LIMIT 50')->fetchAll();
            $modelRows = $db->query('SELECT id, model_id, title, badge, headline, description, features, best_for FROM agency_models ORDER BY id ASC LIMIT 50')->fetchAll();
            $faqRows = $db->query('SELECT question AS q, answer AS a, category AS cat FROM faqs WHERE active = 1 ORDER BY display_order ASC LIMIT 100')->fetchAll();
            $testRows = $db->query('SELECT id, name, role, company, quote, metric, avatar_url, case_study_slug, featured FROM testimonials WHERE featured = 1 ORDER BY display_order ASC LIMIT 50')->fetchAll();
            $offRows = $db->query('SELECT country, city, flag_url AS flag, timezone FROM global_offices ORDER BY display_order ASC LIMIT 50')->fetchAll();

            $data = [
                'caseStudies' => array_map('map_case_study', $csRows),
                'portfolioProjects' => array_map('map_portfolio_project', $portRows),
                'blogPosts' => array_map('map_blog_post', $blogRows),
                'services' => array_map('map_service', $srvRows),
                'products' => array_map('map_product', $prodRows),
                'agents' => array_map('map_agent', $agRows),
                'careers' => [
                    'openRoles' => array_map('map_job_opening', $jobRows),
                    'culturePillars' => $pillarRows,
                    'perksList' => $perkRows,
                ],
                'collectives' => [
                    'creatorTracks' => array_map('map_creator_track', $trackRows),
                    'agencyModels' => array_map('map_agency_model', $modelRows),
                ],
                'faqs' => $faqRows,
                'testimonials' => $testRows,
                'offices' => $offRows,
            ];
            break;
    }

    echo json_encode([
        'success' => true,
        'data' => $data,
        'source' => 'mysql',
        'timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

} catch (\Throwable $err) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Query execution failed',
        'message' => $err->getMessage(),
    ]);
}
