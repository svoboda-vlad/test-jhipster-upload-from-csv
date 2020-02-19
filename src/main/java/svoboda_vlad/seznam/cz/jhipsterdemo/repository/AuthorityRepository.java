package svoboda_vlad.seznam.cz.jhipsterdemo.repository;

import svoboda_vlad.seznam.cz.jhipsterdemo.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
