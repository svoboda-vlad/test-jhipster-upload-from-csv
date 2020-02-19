package svoboda_vlad.seznam.cz.jhipsterdemo.web.rest;

import svoboda_vlad.seznam.cz.jhipsterdemo.JhipsterDemoApp;
import svoboda_vlad.seznam.cz.jhipsterdemo.domain.Director;
import svoboda_vlad.seznam.cz.jhipsterdemo.repository.DirectorRepository;
import svoboda_vlad.seznam.cz.jhipsterdemo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static svoboda_vlad.seznam.cz.jhipsterdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DirectorResource} REST controller.
 */
@SpringBootTest(classes = JhipsterDemoApp.class)
public class DirectorResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DirectorRepository directorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDirectorMockMvc;

    private Director director;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DirectorResource directorResource = new DirectorResource(directorRepository);
        this.restDirectorMockMvc = MockMvcBuilders.standaloneSetup(directorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Director createEntity(EntityManager em) {
        Director director = new Director()
            .name(DEFAULT_NAME);
        return director;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Director createUpdatedEntity(EntityManager em) {
        Director director = new Director()
            .name(UPDATED_NAME);
        return director;
    }

    @BeforeEach
    public void initTest() {
        director = createEntity(em);
    }

    @Test
    @Transactional
    public void createDirector() throws Exception {
        int databaseSizeBeforeCreate = directorRepository.findAll().size();

        // Create the Director
        restDirectorMockMvc.perform(post("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isCreated());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeCreate + 1);
        Director testDirector = directorList.get(directorList.size() - 1);
        assertThat(testDirector.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDirectorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = directorRepository.findAll().size();

        // Create the Director with an existing ID
        director.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDirectorMockMvc.perform(post("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isBadRequest());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = directorRepository.findAll().size();
        // set the field null
        director.setName(null);

        // Create the Director, which fails.

        restDirectorMockMvc.perform(post("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isBadRequest());

        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDirectors() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);

        // Get all the directorList
        restDirectorMockMvc.perform(get("/api/directors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(director.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getDirector() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);

        // Get the director
        restDirectorMockMvc.perform(get("/api/directors/{id}", director.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(director.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingDirector() throws Exception {
        // Get the director
        restDirectorMockMvc.perform(get("/api/directors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDirector() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);

        int databaseSizeBeforeUpdate = directorRepository.findAll().size();

        // Update the director
        Director updatedDirector = directorRepository.findById(director.getId()).get();
        // Disconnect from session so that the updates on updatedDirector are not directly saved in db
        em.detach(updatedDirector);
        updatedDirector
            .name(UPDATED_NAME);

        restDirectorMockMvc.perform(put("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDirector)))
            .andExpect(status().isOk());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeUpdate);
        Director testDirector = directorList.get(directorList.size() - 1);
        assertThat(testDirector.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDirector() throws Exception {
        int databaseSizeBeforeUpdate = directorRepository.findAll().size();

        // Create the Director

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDirectorMockMvc.perform(put("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isBadRequest());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDirector() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);

        int databaseSizeBeforeDelete = directorRepository.findAll().size();

        // Delete the director
        restDirectorMockMvc.perform(delete("/api/directors/{id}", director.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
