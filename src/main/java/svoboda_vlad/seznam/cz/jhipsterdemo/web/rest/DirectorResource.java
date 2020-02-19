package svoboda_vlad.seznam.cz.jhipsterdemo.web.rest;

import svoboda_vlad.seznam.cz.jhipsterdemo.domain.Director;
import svoboda_vlad.seznam.cz.jhipsterdemo.repository.DirectorRepository;
import svoboda_vlad.seznam.cz.jhipsterdemo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link svoboda_vlad.seznam.cz.jhipsterdemo.domain.Director}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DirectorResource {

    private final Logger log = LoggerFactory.getLogger(DirectorResource.class);

    private static final String ENTITY_NAME = "director";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DirectorRepository directorRepository;

    public DirectorResource(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    /**
     * {@code POST  /directors} : Create a new director.
     *
     * @param director the director to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new director, or with status {@code 400 (Bad Request)} if the director has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/directors")
    public ResponseEntity<Director> createDirector(@Valid @RequestBody Director director) throws URISyntaxException {
        log.debug("REST request to save Director : {}", director);
        if (director.getId() != null) {
            throw new BadRequestAlertException("A new director cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Director result = directorRepository.save(director);
        return ResponseEntity.created(new URI("/api/directors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /directors} : Updates an existing director.
     *
     * @param director the director to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated director,
     * or with status {@code 400 (Bad Request)} if the director is not valid,
     * or with status {@code 500 (Internal Server Error)} if the director couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/directors")
    public ResponseEntity<Director> updateDirector(@Valid @RequestBody Director director) throws URISyntaxException {
        log.debug("REST request to update Director : {}", director);
        if (director.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Director result = directorRepository.save(director);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, director.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /directors} : get all the directors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of directors in body.
     */
    @GetMapping("/directors")
    public List<Director> getAllDirectors() {
        log.debug("REST request to get all Directors");
        return directorRepository.findAll();
    }

    /**
     * {@code GET  /directors/:id} : get the "id" director.
     *
     * @param id the id of the director to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the director, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/directors/{id}")
    public ResponseEntity<Director> getDirector(@PathVariable Long id) {
        log.debug("REST request to get Director : {}", id);
        Optional<Director> director = directorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(director);
    }

    /**
     * {@code DELETE  /directors/:id} : delete the "id" director.
     *
     * @param id the id of the director to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/directors/{id}")
    public ResponseEntity<Void> deleteDirector(@PathVariable Long id) {
        log.debug("REST request to delete Director : {}", id);
        directorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
